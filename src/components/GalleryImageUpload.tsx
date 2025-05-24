"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, Loader2, Plus } from "lucide-react"

interface GalleryImage {
  url: string
  alt?: string
}

interface GalleryImageUploadProps {
  images: GalleryImage[]
  onChange: (images: GalleryImage[]) => void
  disabled?: boolean
  maxImages?: number
  className?: string
}

export default function GalleryImageUpload({
  images,
  onChange,
  disabled,
  maxImages = 6,
  className,
}: GalleryImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // 最大枚数チェック
    if (images.length + files.length > maxImages) {
      setError(`最大${maxImages}枚まで追加できます`)
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "アップロードに失敗しました")
        }

        const data = await response.json()
        return {
          url: data.url,
          alt: `ギャラリー画像 ${images.length + 1}`,
        }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      onChange([...images, ...uploadedImages])
    } catch (error) {
      console.error("アップロードエラー:", error)
      setError((error as Error).message)
    } finally {
      setIsUploading(false)
      // ファイル入力をリセット
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
    setError(null)
  }

  const handleAltChange = (index: number, alt: string) => {
    const newImages = images.map((img, i) => (i === index ? { ...img, alt } : img))
    onChange(newImages)
  }

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="space-y-2">
            <div className="relative">
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || `ギャラリー画像 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              type="text"
              value={image.alt || ""}
              onChange={(e) => handleAltChange(index, e.target.value)}
              placeholder="画像の説明"
              disabled={disabled}
              className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        ))}

        {images.length < maxImages && (
          <div
            onClick={handleClick}
            className={`flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/75 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Plus className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-xs text-muted-foreground">画像を追加</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled || isUploading || images.length >= maxImages}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              アップロード中...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              画像を追加
            </>
          )}
        </button>
        <span className="text-sm text-muted-foreground">
          {images.length} / {maxImages} 枚
        </span>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}
