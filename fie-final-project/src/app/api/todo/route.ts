import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, category } = await req.json();

    const todo = await prisma.toDo.create({
      data: {
        name,
        category,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const todo = await prisma.toDo.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
