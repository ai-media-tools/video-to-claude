# Web Dashboard

Manage your uploaded videos through the web dashboard at [ai-media-tools.dev](https://ai-media-tools.dev).

---

## Overview

The dashboard provides a visual interface to:

- **View** all your uploaded videos
- **Delete** videos you no longer need
- **See metadata** like duration, frame count, and expiration date
- **Access** Privacy Policy and Terms of Service

---

## Getting Started

### Step 1: Visit the Dashboard

Go to [ai-media-tools.dev](https://ai-media-tools.dev)

### Step 2: Sign In with GitHub

Click **Sign in with GitHub** to authenticate. This uses the same GitHub OAuth as the CLI upload.

### Step 3: View Your Videos

After signing in, you'll see all videos you've uploaded. Each video card shows:

| Field | Description |
|-------|-------------|
| **Name** | The name you gave when uploading |
| **Duration** | Video length |
| **Frames** | Number of extracted frames |
| **Uploaded** | When you uploaded it |
| **Expires** | Days remaining before auto-deletion (90 days from upload) |

---

## Features

### Viewing Videos

Your video library shows all videos associated with your GitHub account. Videos are private - only you can see your uploads.

### Deleting Videos

Each video card has a delete button. Click it to permanently remove the video from cloud storage. This action cannot be undone.

### Video Expiration

Videos are automatically deleted 90 days after upload. The dashboard shows a progress bar indicating how many days remain before expiration.

To keep a video longer, you can:
1. Download the processed files locally
2. Re-upload before expiration

---

## Privacy & Security

- **Authentication**: GitHub OAuth verifies your identity
- **Isolation**: You can only see and manage your own videos
- **Storage**: Videos stored in Cloudflare R2 (encrypted at rest)
- **Retention**: Videos auto-delete after 90 days

For full details, see the [Privacy Policy](https://ai-media-tools.dev/privacy) and [Terms of Service](https://ai-media-tools.dev/terms).

---

## Relationship to Other Tools

The dashboard complements the other ways to interact with your videos:

| Method | Use Case |
|--------|----------|
| **Web Dashboard** | Visual management, quick deletion, see all videos |
| **CLI** | Upload from terminal, automation, scripting |
| **Claude Code MCP** | Upload via Claude, conversational workflow |
| **Claude.ai Remote MCP** | View videos in Claude conversations |

All methods share the same underlying storage and authentication.

---

## Troubleshooting

### "No videos found"

You haven't uploaded any videos yet. Use the CLI or Claude Code MCP to upload:

```bash
# Process a video
video-to-claude convert ~/Videos/my-video.mp4

# Upload it
video-to-claude upload ./my-video_for_claude/ --name "My Video"
```

### Can't sign in

1. Make sure you're using the same GitHub account you used for uploads
2. Try clearing browser cookies and signing in again
3. Check that pop-ups aren't blocked for the OAuth flow

### Video not appearing after upload

1. Refresh the page
2. Wait a few seconds - uploads may take time to propagate
3. Check the upload command completed successfully

---

## Next Steps

- **[Uploading Videos](Uploading-Videos)** - How to upload via CLI or MCP
- **[Claude.ai Setup](Claude-AI-Setup)** - View videos in Claude conversations
- **[Troubleshooting](Troubleshooting)** - More help with common issues
