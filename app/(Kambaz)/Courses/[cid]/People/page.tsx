"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function People() {
  const { cid } = useParams();
  const router = useRouter();
  
  useEffect(() => {
    router.push(`/Courses/${cid}/People/Table`);
  }, [cid, router]);
  
  return null;
}