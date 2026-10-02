/* eslint-disable @next/next/no-img-element -- Admin previews include local blob URLs and original uploaded photos. */
"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { useState } from "react";

type Photo = { src: string; alt: string };
export default function RichEditor({
  initial,
  onChange,
  photos,
}: {
  initial: string;
  onChange: (html: string) => void;
  photos: Photo[];
}) {
  const [link, setLink] = useState<string | null>(null);
  const [photoPanel, setPhotoPanel] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoAlt, setPhotoAlt] = useState("");
  const [, render] = useState(0);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false, protocols: ["https", "http", "mailto"] },
      }),
      ImageExtension,
    ],
    content: initial,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        role: "textbox",
        "aria-label": "Story content",
        "aria-multiline": "true",
        class: "admin-story-editor",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onTransaction: () => render((value) => value + 1),
  });
  if (!editor) return <p>Loading editor…</p>;
  const button = (label: string, action: () => void, active = false) => (
    <button type="button" aria-pressed={active} onClick={action}>
      {label}
    </button>
  );
  function insertPhoto(src: string, alt: string) {
    if (!/^https:\/\//i.test(src)) return;
    editor?.chain().focus().setImage({ src, alt }).run();
    setPhotoPanel(false);
    setPhotoUrl("");
    setPhotoAlt("");
  }
  return (
    <div className="admin-rich-editor">
      <div
        className="admin-toolbar"
        role="toolbar"
        aria-label="Story formatting"
      >
        {button(
          "Bold",
          () => editor.chain().focus().toggleBold().run(),
          editor.isActive("bold"),
        )}
        {button(
          "Italic",
          () => editor.chain().focus().toggleItalic().run(),
          editor.isActive("italic"),
        )}
        {button(
          "Underline",
          () => editor.chain().focus().toggleUnderline().run(),
          editor.isActive("underline"),
        )}
        <select
          aria-label="Text style"
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
                ? "2"
                : editor.isActive("heading", { level: 3 })
                  ? "3"
                  : "p"
          }
          onChange={(event) => {
            const value = event.target.value;
            value === "p"
              ? editor.chain().focus().setParagraph().run()
              : editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: Number(value) as 1 | 2 | 3 })
                  .run();
          }}
        >
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
        {button(
          "Bullet list",
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList"),
        )}
        {button(
          "Numbered list",
          () => editor.chain().focus().toggleOrderedList().run(),
          editor.isActive("orderedList"),
        )}
        {button(
          "Quote",
          () => editor.chain().focus().toggleBlockquote().run(),
          editor.isActive("blockquote"),
        )}
        {button(
          "Link",
          () => setLink(editor.getAttributes("link").href || ""),
          editor.isActive("link"),
        )}
        {button("Photo", () => setPhotoPanel(!photoPanel), photoPanel)}
        {button("Undo", () => editor.chain().focus().undo().run())}
        {button("Redo", () => editor.chain().focus().redo().run())}
      </div>
      {link !== null && (
        <div className="admin-insert-panel">
          <label>
            Link address
            <input
              type="url"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="https://"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              if (/^(https?:\/\/|mailto:)/i.test(link)) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: link })
                  .run();
                setLink(null);
              }
            }}
          >
            Apply link
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().unsetLink().run();
              setLink(null);
            }}
          >
            Remove link
          </button>
          <button type="button" onClick={() => setLink(null)}>
            Cancel
          </button>
        </div>
      )}
      {photoPanel && (
        <div className="admin-insert-panel">
          <p>
            Choose a saved photo, or enter an image address. Upload new photos
            in the Photos panel and save first.
          </p>
          <div className="admin-photo-choices">
            {photos.map((photo) => (
              <button
                type="button"
                key={photo.src}
                onClick={() => insertPhoto(photo.src, photoAlt || photo.alt)}
              >
                <img src={photo.src} alt={photo.alt} />
                Insert photo
              </button>
            ))}
          </div>
          <label>
            Image address
            <input
              type="url"
              placeholder="https://"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
            />
          </label>
          <label>
            Image description
            <input
              value={photoAlt}
              onChange={(event) => setPhotoAlt(event.target.value)}
            />
          </label>
          <button
            type="button"
            disabled={!/^https:\/\//i.test(photoUrl)}
            onClick={() => insertPhoto(photoUrl, photoAlt)}
          >
            Insert image
          </button>
          <button type="button" onClick={() => setPhotoPanel(false)}>
            Close
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
      <div className="admin-editor-foot">
        {editor.getText().trim().split(/\s+/).filter(Boolean).length} words ·
        Select text to format it
      </div>
    </div>
  );
}
