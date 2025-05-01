'use client'

import React from 'react'
import { messageSchema } from '@/Schemas/messageSchema'
import { useParams } from 'next/navigation'
import * as z from 'zod'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'

const Page = () => {
  const params = useParams<{ username: string }>()

  // Prevent hydration mismatch
  if (!params?.username) return null

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  })

  const [isSuggesting, setIsSuggesting] = React.useState(false)
  const [suggestions, setSuggestions] = React.useState<string[]>([]) // State to hold suggestions

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post('/api/send-message', {
        username: params.username,
        content: data.content,
      })
      console.log(response)
      if (!response.data.success) {
        toast.error(response.data.message)
        return
      }

      toast.success(response.data.message)
      form.reset()
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Error sending message')
    }
  }

  const suggest = async () => {
    setIsSuggesting(true)
    try {
      const response = await axios.post('/api/suggest-messages', {
        context: `Message for user: ${params.username}`,
      })

      if (!response.data.success || !response.data.suggestions) {
        toast.error(response.data.message || 'No suggestions found')
        return
      }

      console.log(response)
      setSuggestions(response.data.suggestions) // Set suggestions to state

      const randomMessage =
        response.data.suggestions[
          Math.floor(Math.random() * response.data.suggestions.length)
        ]

      form.setValue('content', randomMessage)
      toast.success('Suggested message added!')
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Error suggesting message')
    } finally {
      setIsSuggesting(false)
    }
  }

  // Function to handle suggestion click and set the input value
  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('content', suggestion)
  }

  console.log(suggestions)

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[70%] h-full">
        <h1 className="text-4xl font-bold text-center pt-10">
          Public Profile Link
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-10">
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-medium">
                    Send Anonymous Message to @{params.username}
                  </FormLabel>
                  <Input {...field} className="h-16" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="px-8 py-5 bg-gray-500"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Send it'}
              </Button>
            </div>
          </form>
        </Form>

        <Button
          type="button"
          onClick={suggest}
          className="px-8 py-5 bg-gray-800 mt-4"
          disabled={isSuggesting}
        >
          {isSuggesting ? 'Loading...' : 'Suggest Messages'}
        </Button>

        {/* Render suggested messages below the button */}
        {suggestions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-medium mb-4">Suggested Messages:</h2>
            <ul className="space-y-4">
              {suggestions.map((message, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(message)}
                >
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
