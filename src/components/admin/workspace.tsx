/* eslint-disable @next/next/no-img-element -- Admin previews include local blob URLs and original uploaded photos. */
"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Post } from "@/types";
import { dateLabel, photoUrl, request } from "./helpers";
import PostEditor from "./post-editor";

export default function AdminWorkspace() {
  const [screen, setScreen] = useState<"loading" | "login" | "setup" | "posts">(
    "loading",
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Post | null | undefined>(undefined);
  const [editorVersion, setEditorVersion] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const loadPosts = useCallback(async () => {
    const data = await request<{ items: Post[] }>("/api/admin/posts");
    setPosts(data.items);
    setScreen("posts");
  }, []);
  const loadWorkspace = useCallback(async () => {
    const setup = await request<{ configured: boolean }>("/api/admin/setup");
    if (!setup.configured) {
      setScreen("setup");
      return;
    }
    await loadPosts();
  }, [loadPosts]);
  useEffect(() => {
    let active = true;
    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (response) => {
        if (!active) return;
        if (response.status === 401) {
          setScreen("login");
          return;
        }
        if (!response.ok)
          throw new Error(
            "Unable to connect to the content service. Try signing in again.",
          );
        await loadWorkspace();
      })
      .catch((error) => {
        if (active) {
          setScreen("login");
          setError(error.message);
        }
      });
    return () => {
      active = false;
    };
  }, [loadWorkspace]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function leaveEditor() {
    if (dirty && !window.confirm("Leave without saving your changes?"))
      return false;
    setDirty(false);
    setSelected(undefined);
    return true;
  }
  async function login(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await request("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      setPassword("");
      await loadWorkspace();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function setup() {
    setBusy(true);
    setError("");
    try {
      await request("/api/admin/setup", { method: "POST" });
      await loadPosts();
      setNotice("Your editor is ready. All existing stories remain published.");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    if (dirty && !window.confirm("Sign out without saving your changes?"))
      return;
    setBusy(true);
    setError("");
    try {
      await request("/api/admin/session", { method: "DELETE" });
      setPosts([]);
      setSelected(undefined);
      setDirty(false);
      setNotice("");
      setScreen("login");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const published = posts.filter((post) => post.websiteStatus !== "draft");
  const visible = posts.filter((post) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "draft"
        ? post.websiteStatus === "draft"
        : post.websiteStatus !== "draft");
    return (
      matchesFilter &&
      `${post.title} ${post.author} ${post.category || ""}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  });
  return (
    <main className="reves-admin">
      <header className="admin-header">
        <a
          href="/"
          onClick={(event) => {
            if (dirty && !window.confirm("Leave without saving your changes?"))
              event.preventDefault();
          }}
          className="admin-wordmark"
        >
          Reves Foundation
        </a>
        <span className="admin-header-label">Content studio</span>
        <div>
          <a href="/" target="_blank" rel="noreferrer">
            View website ↗
          </a>
          {screen !== "loading" && screen !== "login" && (
            <button type="button" disabled={busy} onClick={logout}>
              Sign out
            </button>
          )}
        </div>
      </header>
      {screen === "loading" ? (
        <div className="admin-loading" role="status">
          Opening your workspace…
        </div>
      ) : screen === "login" ? (
        <div className="admin-login-layout">
          <section className="admin-login-intro">
            <span className="admin-eyebrow">YOUR STORIES. YOUR VOICE.</span>
            <h1>
              A space for
              <br />
              your stories.
            </h1>
            <p>Write, update, and publish stories from Reves Foundation.</p>
            <div className="admin-login-note">
              <span>01</span>
              <p>Keep your posts, photos, and publication details together.</p>
            </div>
          </section>
          <form className="admin-login-card" onSubmit={login}>
            <h2>Welcome back</h2>
            <p>
              Sign in with the PocketBase administrator account used to manage
              your existing posts.
            </p>
            {error && (
              <div className="admin-error" role="alert">
                {error}
              </div>
            )}
            <label className="admin-field">
              Email address
              <input
                autoComplete="username"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="admin-field">
              Password
              <input
                autoComplete="current-password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button disabled={busy} className="admin-button" type="submit">
              {busy ? "Signing in…" : "Sign in →"}
            </button>
            <details className="admin-login-help">
              <summary>Need access?</summary>
              <p>
                This is your content account, which is separate from Vercel and
                GitHub. Recover your administrator access through{" "}
                <a
                  href="https://pockethost.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  PocketHost
                </a>
                , or ask the person who manages your content database. Passwords
                are never saved in this browser.
              </p>
            </details>
          </form>
        </div>
      ) : (
        <div className="admin-workspace">
          {error && (
            <div className="admin-error" role="alert">
              {error}
            </div>
          )}
          {notice && (
            <div className="admin-notice" role="status">
              {notice}
              <button
                type="button"
                aria-label="Dismiss message"
                onClick={() => setNotice("")}
              >
                ×
              </button>
            </div>
          )}
          {screen === "setup" ? (
            <section className="admin-card admin-setup">
              <span className="admin-eyebrow">ONE-TIME SETUP</span>
              <h1>Prepare your editor</h1>
              <p>
                Enable the fields and publishing controls used by your new admin
                section.
              </p>
              <ul>
                <li>
                  Keep all currently visible stories published, with their
                  original text and photos.
                </li>
                <li>
                  Add categories, image descriptions, and space for extra
                  photos.
                </li>
                <li>
                  Hide draft text from public pages and restrict editing to
                  administrators.
                </li>
              </ul>
              <p className="admin-help">
                Uploaded photos use public links, including photos attached to
                drafts.
              </p>
              <button className="admin-button" disabled={busy} onClick={setup}>
                {busy ? "Preparing your editor…" : "Enable editor"}
              </button>
            </section>
          ) : selected !== undefined ? (
            <PostEditor
              key={`${selected?.id || "new"}-${editorVersion}`}
              post={selected}
              hasChanges={dirty}
              onDirty={(value) => {
                setDirty(value);
                if (value) setNotice("");
              }}
              onClose={() => {
                leaveEditor();
              }}
              onSaved={(post) => {
                setPosts((old) => [
                  post,
                  ...old.filter((item) => item.id !== post.id),
                ]);
                setSelected(post);
                setEditorVersion((value) => value + 1);
                setNotice(
                  post.websiteStatus === "draft"
                    ? "Draft saved. This post is hidden from the website."
                    : "Post published. Your changes are now available on the website.",
                );
              }}
            />
          ) : (
            <>
              <div className="admin-page-heading">
                <div>
                  <span className="admin-eyebrow">CONTENT LIBRARY</span>
                  <h1>Posts & stories</h1>
                  <p>
                    Manage the stories shown on your blog and project pages.
                  </p>
                </div>
                <button
                  className="admin-button"
                  onClick={() => {
                    setSelected(null);
                    setNotice("");
                  }}
                >
                  + New post
                </button>
              </div>
              <div className="admin-stats">
                <div>
                  <strong>{posts.length}</strong>
                  <span>All posts</span>
                </div>
                <div>
                  <strong>{published.length}</strong>
                  <span>Published</span>
                </div>
                <div>
                  <strong>{posts.length - published.length}</strong>
                  <span>Drafts</span>
                </div>
              </div>
              <div className="admin-list-controls">
                <div
                  className="admin-tabs"
                  role="group"
                  aria-label="Filter posts"
                >
                  {[
                    { value: "all", label: "All posts" },
                    { value: "published", label: "Published" },
                    { value: "draft", label: "Drafts" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      aria-pressed={filter === item.value}
                      onClick={() => setFilter(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <label className="admin-search">
                  <span className="sr-only">Search posts</span>
                  <input
                    type="search"
                    placeholder="Search title, author, or category"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <button
                  className="admin-text-button"
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    setError("");
                    try {
                      await loadPosts();
                    } catch (error) {
                      setError((error as Error).message);
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="admin-post-list">
                {visible.length ? (
                  visible.map((post) => (
                    <article className="admin-post-row" key={post.id}>
                      {post.featuredImage ? (
                        <img
                          src={photoUrl(post, post.featuredImage)}
                          alt={post.featuredImageAlt || ""}
                        />
                      ) : (
                        <div className="admin-post-placeholder">RF</div>
                      )}
                      <div className="admin-post-details">
                        <span
                          className={`admin-badge ${post.websiteStatus === "draft" ? "draft" : ""}`}
                        >
                          {post.websiteStatus === "draft"
                            ? "Draft"
                            : "Published"}
                        </span>
                        <h2>
                          <button
                            onClick={() => {
                              setSelected(post);
                              setNotice("");
                            }}
                          >
                            {post.title}
                          </button>
                        </h2>
                        <p>
                          {post.author || "No author"} <span>·</span>{" "}
                          {dateLabel(post.datePublished)}
                          {post.category && (
                            <>
                              {" "}
                              <span>·</span> {post.category}
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        className="admin-button secondary"
                        aria-label={`Edit ${post.title}`}
                        onClick={() => {
                          setSelected(post);
                          setNotice("");
                        }}
                      >
                        Edit post ↗
                      </button>
                    </article>
                  ))
                ) : (
                  <div className="admin-empty">
                    <h2>
                      {posts.length
                        ? "No matching posts"
                        : "Your first story starts here"}
                    </h2>
                    <p>
                      {posts.length
                        ? "Try another search or filter."
                        : "Choose New post to add your first story."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      <footer className="admin-footer">
        Reves Foundation · Content studio
      </footer>
    </main>
  );
}
