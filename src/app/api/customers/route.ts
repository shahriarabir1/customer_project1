import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  phone: z.string().min(1),
  city: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const newUser = await prisma.user.create({
    data: { name: body.name, phone: body.phone, city: body.city },
  });
  return NextResponse.json(newUser, { status: 201 });
}

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  if (users) {
    return NextResponse.json(users, { status: 200 });
  } else {
    return NextResponse.json(users, { status: 404 });
  }
}
