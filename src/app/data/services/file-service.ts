import { getAuthToken } from "./get-token";
import { mutateData } from "./mutate-data";
import { getStrapiURL } from "@/lib/utils";

export async function fileDeleteService (imageId: string) {
  const authToken = await getAuthToken()
  if (!authToken) throw new Error("No auth token found")

  const data = await mutateData("DELETE", `/api/upload/files/${imageId}`)
  return data
}

export async function fileUploadService(image: any) {
  const authToken = await getAuthToken()
  if (!authToken) throw new Error("No auth token found")

    const baseUrl = getStrapiURL()
    const url = new URL("/api/upload", baseUrl)

    const formData = new FormData()
    formData.append("files", image, image.name)

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
        method: "POST",
        body: formData
      })

      const dataResponse = await response.json()

      return dataResponse
    } catch (error) {
      console.log("Error uploading image", error);
      throw error
    }
}