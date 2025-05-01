// "use client"
// import React, { useCallback, useState } from 'react'
// import { Message } from '@/models/User'
// import { toast } from 'sonner'
// import { User } from 'next-auth'
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { acceptMessageSchema } from '@/Schemas/acceptMessageSchema';
// import { ApiResponse } from '@/types/ApiResponse';
// import axios, { AxiosError } from 'axios';
// import { MessageCard } from '@/components/MessageCard';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Switch } from '@/components/ui/switch';
// import { Loader2, RefreshCcw } from 'lucide-react';
// type Props = {
//   session: {
//     user?: User
//   } | null
// }
// const Dashboard = ({ session }: Props) => {
//   console.log(session)
//   const [messages , setMessages] = useState<Message[]>([])
//   const [isLoading , setIsLoading] = useState(false)
//   const [isSwitchLoading , setIsSwitchLoading] = useState(false)
//   const handleDeleteMessage = (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId));
//   }
  
//   const form = useForm({
//     resolver: zodResolver(acceptMessageSchema)
//   })
//   const {register , watch , setValue} = form
//   const acceptMessages = watch('acceptMessages')
//   const fetchAcceptMessages = useCallback(async () => {
//     setIsSwitchLoading(true);
//     try {
//       const response = await axios.get<ApiResponse>('/api/accept-messages');
//       // setValue('acceptMessages', response.data.isAcceptingMessages);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       // toast({
//       //   title: 'Error',
//       //   description:
//       //     axiosError.response?.data.message ??
//       //     'Failed to fetch message settings',
//       //   variant: 'destructive',
//       // });
//       toast.error(
//         axiosError.response?.data.message ?? 'Failed to fetch message settings'
//       )
//     } finally {
//       setIsSwitchLoading(false);
//     }
//   }, [setValue, toast]);

//   const fetchMessages = useCallback(
//     async (refresh: boolean = false) => {
//       setIsLoading(true);
//       setIsSwitchLoading(false);
//       try {
//         const response = await axios.get<ApiResponse>('/api/get-messages');
//         setMessages(response.data.messages || []);
//         if (refresh) {
//           toast.success('Refreshed Messages', {
//             description: 'Showing latest messages',
//           });
//         }
//       } catch (error) {
//         const axiosError = error as AxiosError<ApiResponse>;
//         toast.error('Error', {
//           description:
//             axiosError.response?.data.message ?? 'Failed to fetch messages',
//         });
//       } finally {
//         setIsLoading(false);
//         setIsSwitchLoading(false);
//       }
//     },
//     [setIsLoading, setMessages, toast]
//   );
//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post<ApiResponse>('/api/accept-messages', {
//         acceptMessages: !acceptMessages,
//       });
//       setValue('acceptMessages', !acceptMessages);
//       toast(response.data.message);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error('Error', {
//         description:
//           axiosError.response?.data.message ??
//           'Failed to update message settings',
//       });
//     }
//   };
//   if (!session || !session.user) {
//     return <div>hello</div>;
//   }

//   const { username } = session.user as User;
//   const baseUrl = `${window.location.protocol}//${window.location.host}`;
//   const profileUrl = `${baseUrl}/u/${username}`;
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl);
//     toast.success('URL Copied',{description: 'Profile URL has been copied to clipboard.'});
//   }
//   return (
//     <>
//     "Hello"
//     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//       <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={profileUrl}
//             disabled
//             className="input input-bordered w-full p-2 mr-2"
//           />
//           <Button onClick={copyToClipboard}>Copy</Button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <Switch
//           {...register('acceptMessages')}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//         />
//         <span className="ml-2">
//           Accept Messages: {acceptMessages ? 'On' : 'Off'}
//         </span>
//       </div>
//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <MessageCard
//               key={message._id}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           ))
//         ) : (
//           <p>No messages to display.</p>
//         )}
//       </div>
//     </div>
//     </>
//   );
// }


// export default Dashboard


import React from 'react'
import Session from "../../../components/Dashboard/Session"
const page = () => {
  return (
    <Session/>
  )
}

export default page