"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "../ui/separator"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import ImageUpload from "../custom ui/ImageUpload"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(2).max(20),
    description:z.string().min(5).max(500).trim(),
    image: z.string()
  })

const CollectionForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: ""
    },
  })
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    // setLoading(true);
    //return
    try {
        setLoading(true);
        const res = await fetch("/api/collections",{
          method: "POST",
          body: JSON.stringify(values)
        });
        if(res.ok){
          setLoading(false);
          toast.success("New Collection created!");
          router.push("/collections");
        }
        
    } catch (error) {
      console.error(`[Collection _POST]`, error);
      toast.error("Fail to create Collection!");
    }
    
  }
  return (
    <div className="p-10">
        <p className="text-heading2-bold">Create Collection</p>
        <Separator className="my-4 bg-grey-1 mb-7" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Title..." {...field} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Description..." {...field} rows={5} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <ImageUpload value={field.value ? [field.value]:[]}
                            onChange={(url) => field.onChange(url)}
                            onRemove={ () => field.onChange("") }
                            />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex gap-2 items-center">
                <Button className="bg-blue-1 text-white" type="submit"
                  disabled={loading ? true : false}
                >
                  {
                    loading ? 
                    (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                      </>
                    ) 
                    : 
                     "Submit"
                  }
                  
                </Button>
                <Button className="bg-grey-1 text-white" type="button"  onClick={() => router.push("/collections/new")}>Discard</Button>
                </div>
                
            </form>
        </Form>
    </div>
  )
}

export default CollectionForm