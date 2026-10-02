/* eslint-disable @next/next/no-img-element -- Admin previews include local blob URLs and original uploaded photos. */
"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Post } from "@/types";
import {
  dateLabel,
  localDate,
  photoUrl,
  preparePhoto,
  request,
} from "./helpers";
const RichEditor = dynamic(() => import("./rich-editor"), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});
export default function PostEditor({
  post,
  onSaved,
  onClose,
  onDirty,
  hasChanges,
}: {
  hasChanges: boolean;
  post: Post | null;
  onSaved: (post: Post) => void;
  onClose: () => void;
  onDirty: (value: boolean) => void;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [date, setDate] = useState(localDate(post?.datePublished || ""));
  const [category, setCategory] = useState(post?.category || "");
  const [content, setContent] = useState(post?.content || "");
  const [alt, setAlt] = useState(post?.featuredImageAlt || "");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [removeCover, setRemoveCover] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const targetStatus = useRef<"published" | "draft">(
    post?.websiteStatus === "draft" || !post ? "draft" : "published",
  );
  useEffect(() => {
    if (!cover) {
      setCoverPreview("");
      return;
    }
    const url = URL.createObjectURL(cover);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [cover]);
  const currentCover =
    coverPreview ||
    (!removeCover && post?.featuredImage
      ? photoUrl(post, post.featuredImage)
      : "");
  const savedPhotos = post
    ? (post.photos || []).filter((name) => !removed.includes(name))
    : [];
  async function choosePhotos(files: FileList | null, featured: boolean) {
    if (!files?.length) return;
    setProcessing(true);
    setError("");
    try {
      const prepared = await Promise.all(Array.from(files).map(preparePhoto));
      if (featured) {
        setCover(prepared[0]);
        setRemoveCover(false);
      } else setPhotos((old) => [...old, ...prepared]);
      onDirty(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setProcessing(false);
    }
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = new FormData();
      const fields = {
        title,
        description,
        author,
        category,
        featuredImageAlt: alt,
        content,
        datePublished: new Date(date).toISOString(),
        websiteStatus: targetStatus.current,
        updated: post?.updated || "",
        removeCover: String(removeCover),
      };
      Object.entries(fields).forEach(([key, value]) => data.set(key, value));
      if (cover) data.set("featuredImage", cover);
      photos.forEach((photo) => data.append("photos", photo));
      removed.forEach((photo) => data.append("removePhotos", photo));
      if (
        photos.reduce((sum, file) => sum + file.size, cover?.size || 0) +
          content.length * 3 >
        3500000
      )
        throw new Error(
          "These photos are too large to save together. Upload a few at a time, saving between batches.",
        );
      const result = await request<{ post: Post }>(
        `/api/admin/posts${post ? `/${post.id}` : ""}`,
        { method: post ? "PATCH" : "POST", body: data },
      );
      onDirty(false);
      onSaved(result.post);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const escape = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  const previewDoc = `<!doctype html><html><head><meta name="referrer" content="no-referrer"><style>body{max-width:760px;margin:40px auto;padding:20px;color:#313a44;font:18px/1.7 Georgia,serif}img{max-width:100%;height:auto}h1{font-size:40px;line-height:1.2}a{color:#0c529c}blockquote{border-left:3px solid #0c529c;padding-left:20px}small{color:#586777}</style></head><body>${currentCover ? `<img src="${escape(currentCover)}" alt="${escape(alt || title)}">` : ""}<small>${escape(category)}</small><h1>${escape(title)}</h1><p>${escape(author)} · ${escape(dateLabel(date))}</p>${content}</body></html>`;
  return (
    <form
      className="admin-edit-form"
      onSubmit={save}
      onChange={() => onDirty(true)}
    >
      <div className="admin-editor-heading">
        <div>
          <button type="button" className="admin-text-button" onClick={onClose}>
            ← All posts
          </button>
          <h1>{post ? "Edit post" : "New post"}</h1>
        </div>
        <button
          type="button"
          className="admin-button secondary"
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Close preview" : "Preview"}
        </button>
      </div>
      {error && (
        <div role="alert" className="admin-error">
          {error}
        </div>
      )}
      {preview && (
        <section className="admin-preview">
          <h2>Post preview</h2>
          <iframe title="Post preview" sandbox="" srcDoc={previewDoc} />
        </section>
      )}
      <fieldset disabled={busy || processing} className="admin-editor-grid">
        <div className="admin-editor-main">
          <section className="admin-card">
            <label className="admin-field">
              Title
              <input
                autoFocus
                required
                maxLength={300}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
              />
            </label>
            <label className="admin-field">
              Summary
              <textarea
                rows={3}
                maxLength={2000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short introduction for the post listing and search results"
              />
            </label>
            <p className="admin-help">
              This summary also supplies the page’s search description.
            </p>
          </section>
          <section className="admin-card admin-content-card">
            <h2>Story</h2>
            <RichEditor
              initial={post?.content || ""}
              onChange={(html) => {
                setContent(html);
                onDirty(true);
              }}
              photos={[
                ...(post?.featuredImage
                  ? [
                      {
                        src: photoUrl(post, post.featuredImage),
                        alt: alt || title,
                      },
                    ]
                  : []),
                ...savedPhotos.map((name) => ({
                  src: photoUrl(post!, name),
                  alt: "",
                })),
              ]}
            />
          </section>
          <section className="admin-card">
            <h2>Photos</h2>
            <p className="admin-help">
              Upload extra photos, save the post, then use Photo in the story
              toolbar to place them. Up to 20 photos per post.
            </p>
            <input
              aria-label="Upload story photos"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) => {
                void choosePhotos(event.target.files, false);
                event.target.value = "";
              }}
            />
            <div className="admin-photo-grid">
              {savedPhotos.map((name) => (
                <div key={name}>
                  <img src={photoUrl(post!, name)} alt="Story photo" />
                  <button
                    type="button"
                    onClick={() => {
                      setRemoved((old) => [...old, name]);
                      onDirty(true);
                    }}
                  >
                    Remove photo
                  </button>
                </div>
              ))}
            </div>
            {photos.map((file, index) => (
              <div className="admin-upload-row" key={`${file.name}-${index}`}>
                <span>{file.name} · ready to upload</span>
                <button
                  type="button"
                  onClick={() => {
                    setPhotos((old) => old.filter((_, i) => i !== index));
                    onDirty(true);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </section>
        </div>
        <aside className="admin-editor-aside">
          <section className="admin-card">
            <h2>Publication</h2>
            <label className="admin-field">
              Author
              <input
                required
                maxLength={150}
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </label>
            <label className="admin-field">
              Publication date and time
              <input
                required
                type="datetime-local"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
            <p className="admin-help">
              Your local time. The date is displayed on the post; publishing is
              immediate, not scheduled.
            </p>
            <label className="admin-field">
              Category
              <input
                maxLength={100}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="e.g. Community outreach"
              />
            </label>
            <p className="admin-help">
              {post
                ? `Last saved ${new Date(post.updated).toLocaleString()}`
                : "This post has not been saved yet."}
            </p>
            {post && post.websiteStatus !== "draft" && (
              <a href={`/projects/${post.id}`} target="_blank" rel="noreferrer">
                View published post ↗
              </a>
            )}
          </section>
          <section className="admin-card">
            <h2>Cover photo</h2>
            {currentCover ? (
              <div>
                <img
                  className="admin-cover-preview"
                  src={currentCover}
                  alt={alt || title || "Cover preview"}
                />
                <button
                  className="admin-text-button"
                  type="button"
                  onClick={() => {
                    setCover(null);
                    setRemoveCover(true);
                    onDirty(true);
                  }}
                >
                  Remove cover
                </button>
              </div>
            ) : (
              <div className="admin-cover-empty">No cover photo</div>
            )}
            <label className="admin-field">
              {currentCover ? "Replace photo" : "Upload photo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => {
                  void choosePhotos(event.target.files, true);
                  event.target.value = "";
                }}
              />
            </label>
            <p className="admin-help">
              Photos are resized for the web before uploading.
            </p>
            <label className="admin-field">
              Image description
              <input
                maxLength={300}
                value={alt}
                onChange={(event) => setAlt(event.target.value)}
                placeholder="Describe the photo for screen readers"
              />
            </label>
          </section>
        </aside>
      </fieldset>
      <div className="admin-save-bar">
        <span>
          {processing
            ? "Preparing photos…"
            : busy
              ? "Saving your changes…"
              : hasChanges
                ? "Unsaved changes"
                : "Blog and project pages share this story."}
        </span>
        <div>
          <button
            disabled={busy || processing}
            className="admin-button secondary"
            type="button"
            onClick={(event) => {
              targetStatus.current = "draft";
              event.currentTarget.form?.requestSubmit();
            }}
          >
            {post && post.websiteStatus !== "draft"
              ? "Move to drafts"
              : "Save draft"}
          </button>
          <button
            disabled={busy || processing}
            className="admin-button"
            type="submit"
            onClick={() => {
              targetStatus.current = "published";
            }}
          >
            {post && post.websiteStatus !== "draft"
              ? "Save changes"
              : "Publish post"}
          </button>
        </div>
      </div>
    </form>
  );
}
