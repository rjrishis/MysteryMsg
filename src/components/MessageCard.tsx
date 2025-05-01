'use client'

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
// import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/models/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { toast } from "sonner"
import { ApiResponse } from '@/types/ApiResponse';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
    //   toast({
    //     title: response.data.message,
    //   });
    //   onMessageDelete(message._id);
    toast.success(response.data.message) // ✅ styled as a success toast
    onMessageDelete(message._id)            

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
    //   toast({
    //     title: 'Error',
    //     description:
    //       axiosError.response?.data.message ?? 'Failed to delete message',
    //     variant: 'destructive',
    //   });

    toast.error("Failed to delete message", {
    description: axiosError.response?.data.message,
  })
    } 
  };

  return (
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          {/* {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')} */}
          {new Date(message.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
          {' '}
          
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}