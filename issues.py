import os
import requests
from dotenv import load_dotenv

# Load GitHub token from .env
load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Set your GitHub repo info
REPO_OWNER = "pkfitzvt"
REPO_NAME = "MathSongDemo"

# Example issues to upload
ISSUES = [
    {"title": "Create bouncing ball lyric data structure", "body": "Use timestamps to sync with recorded audio."},
    {"title": "Add audio playback controls", "body": "Play/Pause button for quadratic_song.mp3"},
    {"title": "Build lyric highlighting animation", "body": "Use setTimeout to trigger highlights on time"},
    {"title": "Support translations", "body": "Allow students to toggle languages (ES, FR, etc.)"},
]

# GitHub API
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

def create_issue(issue):
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues"
    response = requests.post(url, json=issue, headers=headers)
    if response.status_code == 201:
        print(f"✅ Created: {issue['title']}")
    else:
        print(f"❌ Failed ({response.status_code}): {response['message']}")

# Run
for issue in ISSUES:
    create_issue(issue)
