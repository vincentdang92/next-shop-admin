"use client"

import { useEffect, useState } from "react"

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, SetCollections] = useState([]);

  const getCollections = async () => {
    try {
        const res = await fetch("/api/collections", {
          method: "GET"
        });
        const data = await res.json();
        SetCollections(data);
    } catch (error) {
      console.log("[getCollections]", error);
    }
  }
  useEffect(() => {
    getCollections();

  }, [])
  console.log(collections);
  return (
    <div>Collections</div>
  )
}

export default Collections