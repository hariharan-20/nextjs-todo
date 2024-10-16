"use server"

import { ITodo } from '@/types/types'
import { prisma } from '@/utils/prisma'
import { revalidatePath } from 'next/cache'

export async function createTodo({ title }: { title: string }) {
    if (!title.trim()) return
    await prisma.todo.create({
        data: {
            title
        }
    })

    revalidatePath("/")
}

export async function getAllData(): Promise<ITodo[]> {
    const data = await prisma.todo.findMany({
        select: {
            title: true,
            isCompleted: true,
            id: true,
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    return data
}
export async function changeStatus({ id }: { id: string }) {
    const currTodo = await prisma.todo.findUnique({
        where: {
            id
        }
    })
    const updatedStatus = !currTodo?.isCompleted
    await prisma.todo.update({
        where: {
            id
        },
        data: {
            isCompleted: updatedStatus
        }
    })
}
export async function updateTitle({ id, value }: { id: string, value: string }) {
    if (!value.trim()) return
    await prisma.todo.update({
        where: {
            id
        },
        data: {
            title: value
        }
    })
}

export async function deleteTodo({ id }: { id: string }) {
    await prisma.todo.delete({
        where: {
            id
        },
    })
}