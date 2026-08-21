# VCS GitHub Clone

A custom Version Control System (VCS) and GitHub-like platform built from scratch with Node.js, React, and AWS S3. This project demonstrates core version control mechanics—such as creating commit objects, branching, and pushing/pulling remote state—backed by cloud object storage.

---

## Features

- **Custom VCS Core Engine:** Recreates fundamental Git-like concepts such as tracking snapshots, staging changes, and commit graphs.
- **Branching & History:** Supports branch creation, switching, and viewing commit logs.
- **Cloud Remote Storage:** Implements remote sync (`push` and `pull`) using **AWS S3** as the underlying remote object storage.
- **Web Interface:** A frontend dashboard to inspect repositories, commit history, and file structures.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React, HTML5, CSS3
- **Cloud & Storage:** AWS S3 (Simple Storage Service)
- **Language:** JavaScript

---

## Project Structure

```text
├── backend/          # Express server, VCS engine logic, and AWS S3 integration
├── frontend/         # React client interface for repository management
└── README.md