"use client"

import { Button, Textarea } from "@nextui-org/react"
import { type useChat } from "ai/react"
import { Send } from "lucide-react"

type HandleInputChange= ReturnType<typeof useChat>["handleInputChange"]
type HandleSubmit =ReturnType<typeof useChat>["handleSubmit"]
type SetInput =ReturnType<typeof useChat>["setInput"]

interface ChatInputProps{
    input: string
    handleInputChange: HandleInputChange
    handleSubmit: HandleSubmit
    setInput: SetInput
}
export const ChatInput = ({handleInputChange,handleSubmit,input,setInput}: ChatInputProps) => {
  return (
    <div className="z-10 bg-zinc-900 absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                minRows={1}
                autoFocus
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e)=>{
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit()
                        setInput("")
                    }
                }}
                placeholder="Enter your question..."
                className="resize-none bg-zinc-800 text-zinc-400 placeholder:text-zinc-500 rounded-2xl px-4 py-2 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              />
              <Button
                size="sm"
                type="submit"
                className="absolute z-10 p-2 bg-zinc-700 hover:bg-zinc-800 right-2 bottom-2 text-white rounded-full"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
