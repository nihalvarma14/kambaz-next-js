"use client";
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  
  const fetchProfile = async () => {
    try {
      // First try to get profile from server
      const currentUser = await client.profile();
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
        // Store in localStorage as backup
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        // If server doesn't have session, check localStorage
        const stored = localStorage.getItem('currentUser');
        if (stored) {
          const user = JSON.parse(stored);
          dispatch(setCurrentUser(user));
        }
      }
    } catch (err: any) {
      // If server request fails, try localStorage
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const user = JSON.parse(stored);
        dispatch(setCurrentUser(user));
      }
      console.error(err);
    }
    setPending(false);
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (!pending) {
    return children;
  }
  
  return null;
}