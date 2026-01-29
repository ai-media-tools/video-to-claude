# video-to-claude

Translate video files into a format Claude can experience.

Claude can't watch videos, but it can view images and read data. This tool extracts sequential frames, generates spectrograms, and produces audio analysis - everything Claude needs to "experience" your video.

## Features

- **Frame Extraction**: Extracts evenly-spaced frames from any video
- **Audio Analysis**: Generates spectrograms, waveforms, and detailed frequency analysis
- **MCP Integration**: Works as an MCP server for seamless Claude integration
- **Local & Remote**: Run locally with Claude Code or deploy to Cloudflare for anywhere access

## Installation

```bash
# Requires ffmpeg
brew install ffmpeg  # macOS
apt install ffmpeg   # Ubuntu/Debian

# Install the tool
pip install video-to-claude

# With MCP server support
pip install video-to-claude[mcp]

# With all features (MCP, upload, download)
pip install video-to-claude[all]
```

## Quick Start

### CLI Usage

```bash
# Convert a video - extracts 20 frames + audio analysis
video-to-claude convert ~/Videos/my_video.mp4

# Custom frame count
video-to-claude convert ~/Videos/my_video.mp4 --frames 30

# Custom output directory
video-to-claude convert ~/Videos/my_video.mp4 --output ./output/

# Skip audio analysis (frames only)
video-to-claude convert ~/Videos/my_video.mp4 --no-audio

# Get video info without processing
video-to-claude info ~/Videos/my_video.mp4
video-to-claude info ~/Videos/my_video.mp4 --json
```

### MCP Server (Claude Code)

Add to your Claude Code MCP settings:

```json
{
  "mcpServers": {
    "video-to-claude": {
      "command": "video-to-claude-mcp"
    }
  }
}
```

Then in Claude Code:
```
"Convert the video at ~/Videos/wilson.mov"
"Show me frame 10 from ./wilson_for_claude/"
"What does the audio spectrogram look like?"
```

### Remote MCP Server (Claude Anywhere)

For accessing videos from Claude Chat, Claude API, or any MCP client:

1. Deploy to Cloudflare Workers (see [Deployment](#deployment))
2. Upload processed videos to cloud storage
3. Connect from any MCP client

## Output Structure

```
my_video_for_claude/
├── manifest.json          # Metadata and viewing instructions
├── frame_001.jpg          # Sequential frames
├── frame_002.jpg
├── ...
├── frame_020.jpg
├── spectrogram.png        # Audio frequency visualization
├── waveform.png           # Audio amplitude visualization
└── audio_analysis.json    # Detailed audio metrics
```

## MCP Tools

### Local MCP Server

| Tool | Description |
|------|-------------|
| `convert_video` | Process a video file into Claude-friendly format |
| `get_video_info` | Get video metadata without processing |
| `view_frame` | View a specific frame from processed video |
| `view_all_frames` | View multiple frames at once |
| `view_spectrogram` | View audio spectrogram |
| `view_waveform` | View audio waveform |
| `get_audio_analysis` | Get detailed audio analysis |
| `get_manifest` | Get the video manifest |

### Remote MCP Server

| Tool | Description |
|------|-------------|
| `list_videos` | List all uploaded videos |
| `get_manifest` | Get manifest for a video |
| `get_frame` | Get a single frame |
| `get_frames` | Get multiple frames |
| `get_spectrogram` | Get spectrogram image |
| `get_waveform` | Get waveform image |
| `get_audio_analysis` | Get audio analysis data |

## Cloud Upload

Upload processed videos to Cloudflare R2 for remote access:

```bash
# Process locally first
video-to-claude convert ~/Videos/wilson.mov

# Upload to R2
video-to-claude upload ./wilson_for_claude/ --name "Wilson greeting"
```

Required environment variables:
```bash
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
export CLOUDFLARE_R2_ACCESS_KEY_ID="your-access-key"
export CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-secret-key"
```

## Deployment

### Cloudflare Workers

```bash
cd workers

# Install dependencies
npm install

# Configure wrangler.toml with your R2 bucket and KV namespace

# Set secrets
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put COOKIE_ENCRYPTION_KEY

# Deploy
npm run deploy
```

### GitHub OAuth Setup

1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Set callback URL to `https://your-worker.workers.dev/callback`
3. Add client ID and secret as Cloudflare secrets

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      LOCAL MACHINE                          │
│  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │  video file     │───▶│  video-to-claude CLI        │    │
│  └─────────────────┘    │  (Python + ffmpeg + scipy)  │    │
│                         └──────────┬──────────────────┘    │
│                                    │                        │
│                         ┌──────────▼──────────────────┐    │
│                         │  Local MCP Server (stdio)   │    │
│                         │  For Claude Code            │    │
│                         └─────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                                     │ upload
                                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE                               │
│  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │  R2 Storage     │◀──▶│  Remote MCP Server          │    │
│  │  (frames, etc.) │    │  (Workers + OAuth)          │    │
│  └─────────────────┘    └─────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                                     │ Streamable HTTP
                                     ▼
                         ┌─────────────────────────────┐
                         │  Claude (anywhere)          │
                         └─────────────────────────────┘
```

## Why?

Videos contain moments worth sharing - a pet's greeting, a child's first steps, a sunset. Claude can understand these moments through sequential frames and audio analysis, experiencing the motion and sound in its own way.

This tool is a codec for Claude.

## License

MIT
