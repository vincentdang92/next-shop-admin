import Collection from "@/lib/models/Collection";
import { ConnectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status: 403});
        }
        await ConnectToDB();

        const { title, description, image } = await req.json();
        const existingCollection = await  Collection.findOne({
            title
        });
        if(existingCollection){
            return new NextResponse("Collection already exist", {status: 400});
        }

        if(!title || !image){
            return new NextResponse("Title and image are required", {status: 400});
        }

        const newCollection = await  Collection.create({
            title,
            description,
            image
        });
        await newCollection.save();

        return NextResponse.json(newCollection, { status: 201 });
    } catch (error) {
        console.error(`[Collection POST]`,error);
        return new NextResponse("Internal server error", {status: 500});
    }
}
export const GET = async () => {
    try {
        await ConnectToDB();
        const collections =  await Collection.find().sort({ createdAt: "desc" });
        return NextResponse.json(collections , {status: 200});
    } catch (error) {
        console.error("[Collection GET]", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}