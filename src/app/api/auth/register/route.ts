import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function POST(request: Request): Promise<Response> {
    try {
        const data: RegisterRequestBody = await request.json();

        const userFound: User | null = await db.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (userFound) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const usernameFound: User | null = await db.user.findFirst({
            where: {
                username: data.username,
            },
        });

        if (usernameFound) {
            return NextResponse.json(
                {
                    message: "username already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword: string = await bcrypt.hash(data.password, 10);
        const newUser: User = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
            },
        });

        const user = { ...newUser };

        return NextResponse.json(user);
    } catch (error: unknown) {
            if (error instanceof Error) {
                return NextResponse.json(
                    {
                        message: error.message,
                    },
                    {
                        status: 500,
                    }
                );
        } else {
            return NextResponse.json(
                {
                    message: "An unknown error occurred",
                },
                {
                    status: 500,
                }
            );
        }
    }
}