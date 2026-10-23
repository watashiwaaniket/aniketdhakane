---
title: "Your agent can write the button. It still needs to click it."
nav: "UI eyes"
date: "2026-10-23"
author: "Aniket Dhakane"
preview: "A clean typecheck does not mean Save works. A small MCP server opens a visible browser on localhost so any coding agent can look at the page it just changed."
askLabel: "Want to dive much deeper? Ask your favorite AI."
askPrompt: "Read https://www.aniketdhakane.xyz/blog/agent-agnostic-ui-verification. Explain the four layers, why the first browser is visible rather than headless, how failed differs from inconclusive, and how I would stand up the ui-verify MCP server against a localhost app I already run."
---

The agent said the task modal was done. The file typechecked. The Save button was in the component. I opened the modal, typed Lunch, and pressed Save. The button sank. The modal stayed. The list underneath still said nothing was due today.

That is a failed UI check. The compiler was never going to catch it. The button is real. The click handler is missing, or it writes to a state the list does not read. Either way, the rendered page is the thing the user meets.

[T3 Code](https://github.com/pingdotgg/t3code) already does a version of this after a feature. The agent drives a Playwright browser, looks at the change it just made, and can attach a screenshot or a video as evidence. I wanted that check in whatever editor I happen to be using, against the dev server the repo already has. I did not want to fork T3 to get it, and I did not want the first version to be a browser panel glued into one IDE.

The split is the whole design. The coding agent writes the code. A separate process owns the browser. A standard tool interface sits between them. Generating the button and verifying the button are different jobs.

![The agent is finished because the file typechecks. The check is still: open the modal, type Lunch, press Save, and read the list.](/blog/ui-eyes-talk.png)

## Three endings for the same click

Keep the words precise, because agents inflate them.

**Passed.** After Save, the list contains Lunch. You saw that text. You can point at the screenshot.

**Failed.** The page loaded, the click happened, and the list is still empty. Or the modal never opened. The UI did the wrong thing. That is the Lunch case above.

**Inconclusive.** You never got a look. Localhost refused the connection. The browser crashed. The tool was available and the agent never called it. Two buttons are both named Save, so the click refuses to guess. None of these is a failed assertion about the modal, and none of them is a pass.

A screenshot is evidence. It becomes a result only next to a sentence about what you expected to see. "Here is a PNG" is not "Lunch is on the list."

## Four pieces

The agent, the tool contract, the browser, and the app are four processes. Mixing them is how this turns into an IDE plugin you have to rewrite for the next editor.

![The agent calls tools. A small MCP server owns Playwright. Playwright drives the app you already started. PNG and video files are the evidence.](/blog/ui-eyes-layers.png)

**The agent** implements the change, then calls tools. It does not launch Chromium itself. If it never calls the tools, the check did not happen.

**The MCP server** is the contract. MCP is how a host discovers tools and invokes them. Cursor, Claude Code, Kiro, and any other host that speaks MCP can start the same Node process. MCP does not make those hosts share a system prompt, a permission model, or a habit of actually calling the tool. The interface is common. The loop is not.

**Playwright** drives Chromium against the dev server you already started. It talks to the DOM. It does not need to know whether the page is React, Vue, or Angular. Login, fixtures, custom controls, and the meaning of "saved" are still properties of your app. Framework independence stops at the accessible controls.

**Evidence** is files. A PNG from the screenshot tool. A WebM once the page closes, because Playwright finishes the video on close. A trace zip can come later. Pixel diffs can come later too, and a one pixel antialias change should not fail a build by default. Putting a comment on a pull request is a separate step, and only after you asked for it.

The server in this post does the first two artifacts. It does not open pull requests, and it does not diff pixels.

## Own a small tool list

`@playwright/mcp` is a fair first afternoon. You get a browser. You do not get a session you defined, and you do not get a short list of tools you can explain to the agent in one prompt.

I wanted seven tools, with names that say what they do:

- `browser_open` opens a localhost URL in a visible window and returns the URL and the title.
- `browser_inspect` returns the URL, the title, the visible text capped at 8,000 characters, recent console errors, and recent failed requests.
- `browser_click` clicks the one control with this role and this accessible name.
- `browser_fill` fills the one textbox with this accessible name.
- `browser_screenshot` writes a PNG and returns the image to the agent.
- `browser_diagnostics` returns the last 100 console errors and failed requests.
- `browser_close` closes the page so the video file is finalized, then returns that path.

Clicks go through the accessible name, not a CSS selector. `button.primary` matches whatever the stylesheet happens to mark, including a hidden node. `getByRole("button", { name: "Save", exact: true })` matches what a person can find. If the count is not 1, the tool throws. Guessing among two Save buttons is how you click the wrong one and call it a pass.

The textbox has to have a name too. If the New task field is an unlabeled `<input>`, the fill fails. That failure is useful. An input a browser cannot name is an input a lot of people cannot use either.

Console errors and failed requests are signals. A missing favicon, or an extension complaining in the console, is not automatic proof that Save is broken. The agent has to say which signal belongs to the bug.

## Visible on purpose

A headless browser that returns a PNG is a file. It is not a window you can watch while the agent clicks Cancel and reports that it clicked Save. The first version launches Chromium with `headless: false`, at 1280 by 800, in its own window. With an MCP-only integration, that window is not a panel inside the IDE. Most hosts cannot mount an arbitrary panel anyway. Build the tools first. A companion view can call the same tools later.

Headless is the right switch for a CI job where nobody is sitting there. It is a bad default for the hour when you are trying to see the miss. This file leaves the window on.

One page stays open across tool calls, so you can watch a sequence. That same stickiness is a trap for a repeatable test. Cookies, a half-filled form, and yesterday's Lunch will leak into today's run. Interactive inspection wants the persistent page. A journey you plan to quote wants a fresh browser context. Version 0.1.0 only has the persistent page. The next tool should be `run_ui_journey`, opening a clean context per run.

## The folder

This is a separate repo from the app under test. The app keeps its own `npm run dev`. This process only attaches.

```text
ui-verify/
  src/index.ts
  artifacts/.gitkeep
  .gitignore
  package.json
  tsconfig.json
```

`.gitignore`:

```gitignore
node_modules/
dist/
artifacts/*
!artifacts/.gitkeep
.env
```

Pin the versions that typechecked. `latest` will not mean these versions in a month.

```json
{
  "name": "ui-verify",
  "private": true,
  "type": "module",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "tsc"
  },
  "dependencies": {
    "@modelcontextprotocol/server": "2.3.1",
    "playwright": "1.64.1",
    "zod": "4.6.7"
  },
  "devDependencies": {
    "@types/node": "26.6.5",
    "typescript": "7.0.2"
  }
}
```

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"]
}
```

```bash
mkdir ui-verify && cd ui-verify
npm init -y
npm pkg set type=module
npm install @modelcontextprotocol/server@2.3.1 playwright@1.64.1 zod@4.6.7
npm install -D typescript@7.0.2 @types/node@26.6.5
npx playwright install chromium
npm run typecheck
npm run build
```

`npx playwright install chromium` is required before a real launch. I had not run it when I typechecked the file below. `tsc --noEmit` exited 0 against those four package versions. The process has not driven a live page. A green typecheck is the same kind of evidence as a Save button that typechecks. Useful, and not the click.

The SDK line that matches this file is `@modelcontextprotocol/server`, with `registerTool` and `zod/v4`. The older `server.tool(...)` helper from `@modelcontextprotocol/sdk` is the previous generation. New code should not copy it.

Stdout belongs to MCP. Failures go to stderr. The host starts this process when it connects. Starting a second copy by hand gives you two browsers and a confused agent.

## The server

Localhost only: `localhost`, `127.0.0.1`, and `::1`, over `http` or `https`. The video directory is created before launch, because Playwright wants the directory to exist. `browser_close` reads `page.video().path()` after `page.close()`. Roles are `button`, `link`, `textbox`, and `checkbox`. Screenshot names are reduced to letters, numbers, and hyphens.

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from "playwright";
import * as z from "zod/v4";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const server = new McpServer({
  name: "ui-verify",
  version: "0.1.0",
});

const artifactsDir = path.resolve("artifacts");

let browser: Browser | undefined;
let context: BrowserContext | undefined;
let page: Page | undefined;
const consoleErrors: string[] = [];
const failedRequests: string[] = [];

const roles = z.enum(["button", "link", "textbox", "checkbox"]);

function assertLocalUrl(raw: string): URL {
  const url = new URL(raw);
  const local = new Set(["localhost", "127.0.0.1", "::1"]);
  if (!["http:", "https:"].includes(url.protocol) || !local.has(url.hostname)) {
    throw new Error("This server only opens localhost URLs.");
  }
  return url;
}

async function ensurePage(): Promise<Page> {
  if (page && !page.isClosed()) return page;

  await mkdir(path.join(artifactsDir, "videos"), { recursive: true });
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: path.join(artifactsDir, "videos"),
      size: { width: 1280, height: 800 },
    },
  });
  page = await context.newPage();

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });
  page.on("requestfailed", (request) => {
    const reason = request.failure()?.errorText ?? "request failed";
    failedRequests.push(`${request.method()} ${request.url()} (${reason})`);
  });

  return page;
}

function currentPage(): Page {
  if (!page || page.isClosed()) {
    throw new Error("No page is open. Call browser_open first.");
  }
  return page;
}

async function oneMatch(
  active: Page,
  role: z.infer<typeof roles>,
  name: string,
) {
  const matches = active.getByRole(role, { name, exact: true });
  const count = await matches.count();
  if (count !== 1) {
    throw new Error(`Expected 1 ${role} named "${name}", found ${count}.`);
  }
  return matches;
}

server.registerTool(
  "browser_open",
  {
    description: "Open a visible browser at a localhost URL.",
    inputSchema: z.object({ url: z.string() }),
  },
  async ({ url }) => {
    const safe = assertLocalUrl(url);
    const active = await ensurePage();
    await active.goto(safe.href, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            url: active.url(),
            title: await active.title(),
          }),
        },
      ],
    };
  },
);

server.registerTool(
  "browser_inspect",
  {
    description: "Read the current URL, title, and visible text.",
  },
  async () => {
    const active = currentPage();
    const text = await active.locator("body").innerText({ timeout: 5_000 });
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              url: active.url(),
              title: await active.title(),
              text: text.slice(0, 8_000),
              consoleErrors: consoleErrors.slice(-30),
              failedRequests: failedRequests.slice(-30),
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.registerTool(
  "browser_click",
  {
    description: "Click the one control with this role and accessible name.",
    inputSchema: z.object({ role: roles, name: z.string().min(1).max(200) }),
  },
  async ({ role, name }) => {
    const active = currentPage();
    const matches = await oneMatch(active, role, name);
    await matches.click({ timeout: 10_000 });
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            clicked: { role, name },
            url: active.url(),
            title: await active.title(),
          }),
        },
      ],
    };
  },
);

server.registerTool(
  "browser_fill",
  {
    description: "Fill the one textbox with this accessible name.",
    inputSchema: z.object({
      name: z.string().min(1).max(200),
      value: z.string().max(2_000),
    }),
  },
  async ({ name, value }) => {
    const active = currentPage();
    const matches = await oneMatch(active, "textbox", name);
    await matches.fill(value, { timeout: 10_000 });
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ filled: name, url: active.url() }),
        },
      ],
    };
  },
);

server.registerTool(
  "browser_screenshot",
  {
    description: "Save a screenshot and return the image.",
    inputSchema: z.object({
      name: z.string().min(1).max(80).default("view"),
    }),
  },
  async ({ name }) => {
    const active = currentPage();
    await mkdir(artifactsDir, { recursive: true });
    const safe = name.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "");
    const filename = `${safe || "view"}.png`;
    const filepath = path.join(artifactsDir, filename);
    const shot = await active.screenshot({
      path: filepath,
      animations: "disabled",
    });
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            file: filepath,
            url: active.url(),
            title: await active.title(),
          }),
        },
        {
          type: "image" as const,
          data: shot.toString("base64"),
          mimeType: "image/png" as const,
        },
      ],
    };
  },
);

server.registerTool(
  "browser_diagnostics",
  {
    description: "Return recent console errors and failed network requests.",
  },
  async () => ({
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            consoleErrors: consoleErrors.slice(-100),
            failedRequests: failedRequests.slice(-100),
          },
          null,
          2,
        ),
      },
    ],
  }),
);

server.registerTool(
  "browser_close",
  {
    description: "Close the browser and return the finalized video path.",
  },
  async () => {
    if (!page || page.isClosed()) {
      return {
        content: [{ type: "text" as const, text: "No active page." }],
      };
    }
    const video = page.video();
    await page.close();
    const videoPath = video ? await video.path().catch(() => null) : null;
    await context?.close();
    await browser?.close();
    page = undefined;
    context = undefined;
    browser = undefined;
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ closed: true, videoPath }),
        },
      ],
    };
  },
);

async function shutdown() {
  await browser?.close().catch(() => undefined);
  process.exit(0);
}

process.on("SIGINT", () => {
  void shutdown();
});
process.on("SIGTERM", () => {
  void shutdown();
});

async function main() {
  await mkdir(artifactsDir, { recursive: true });
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  console.error("ui-verify failed:", error);
  process.exit(1);
});
```

## Point a host at the same command

The host config is the command that runs the built file. Cursor and Claude Code use a JSON file shaped like this. Kiro stores the same object in its MCP settings. If your host uses a different key, follow its docs and keep the command.

```json
{
  "mcpServers": {
    "ui-verify": {
      "command": "node",
      "args": ["/absolute/path/to/ui-verify/dist/index.js"]
    }
  }
}
```

You start the app. `npm run dev`, or whatever `package.json` already says. This server does not try to launch Vite, Next, and Nx. Guessing the command, or killing whatever is already on the port, is how you test the wrong process.

Then paste a prompt that names the journey. For the modal:

```text
Use the ui-verify tools.

The app is already running. If I did not give you the URL, ask.
Do not start a second dev server, and do not kill a process you did not start.

Open the localhost URL. Read the page. Take a screenshot.

Journey: open the new-task modal, fill the textbox (its accessible name,
for this app, is Task) with Lunch, click the button named Save, then read
the list. If the textbox has no accessible name, stop and report that.

Look at the empty list before the first save. If an empty submit has its
own error, trigger it once and read the message.

Read console errors and failed requests. Say which ones belong to this bug.

Take a final screenshot. Close the browser so the video file is written.

Report what you tested, what passed, what failed, and what was inconclusive.
A step you did not run is inconclusive. Do not call it a pass.
Do not open a pull request. Do not upload the screenshots.
```

Change `Task` to the label your input actually has. Leaving the sample name in a prompt for a different app is another way to get a confident report about a control that was never there.

## How to roll the result up

When you do add `run_ui_journey`, give it a result that can say "I could not tell."

```ts
type Status = "passed" | "failed" | "inconclusive";

type UIObservation = {
  status: Status;
  detail: string;
};

type UIJourneyResult = {
  name: string;
  status: Status;
  steps: UIObservation[];
  artifacts: string[];
};
```

Rules I would enforce in that tool, which the file above does not implement yet:

If the page never loaded, the journey is inconclusive. Do not also mark Save as failed. You did not see Save.

If the page loaded and the list stayed empty, the journey is failed, even when a later screenshot times out. Report the timeout as its own inconclusive step.

If every step ran and matched, the journey is passed. Name the text you saw. "Lunch" in the list, not "the UI looked correct."

A tool that throws because two buttons share a name is inconclusive about the click, and it is a finding about the page. Say both.

## What I would not build yet

An embedded live preview inside the IDE. That is the part of T3 that looks like magic, and it is the part that ties you to one host. The window beside the editor is enough to see a bad click.

A fork of T3. The behavior worth copying is "the agent looks at the rendered page." The panel, the recording chrome, and the pull-request flow are not one reusable module.

A launcher that knows every framework. Read the repo's own script. Reuse a server that is already up.

Automatic pull requests, and automatic upload of screenshots. Evidence stays in `artifacts/` until someone asks. Those files are large, and they sometimes contain whatever was on the screen.

A pixel diff as a hard failure. Layouts move by a pixel because a font hinted differently. Diff when you are hunting a specific regression, and keep a threshold you chose on purpose.

A claim that this is universal. I have not connected two hosts, and I have not run it against two frameworks. The tool list is host-shaped. The proof is still missing.

## Where the report will lie to you

The agent narrates a click it did not make. The transcript is not the result. The result is the tool's return value and the file on disk.

The check ran against the wrong port. You were sure the modal was fine because you were looking at yesterday's server.

The persistent page still had Lunch in it from the previous attempt. The second run "passed" because the first run's data was sitting there. That is why a quoted journey wants a fresh context.

The screenshot includes a customer name, a token, or a medical record. Use a fixture. Lunch is a fixture. Production data is not.

You commit `artifacts/`. The directory is gitignored for a reason. A WebM of a local session does not belong in the repo.

You expose the MCP server, or the browser it opened, beyond your own machine. This process has no authentication. It is a stdio tool the editor starts. It is not a service.

You call a missing dev server a failed test, or a test you skipped a pass. Those are the two lies this vocabulary exists to prevent.

## Questions you will hit

### Do I start from `@playwright/mcp` instead?

If you want a browser tool this afternoon, yes. Move to this server when you want this tool list, one visible window that stays open, role-and-name clicks, and a video path after close.

### Will the agent test every feature on its own?

No. The prompt guides it. A CI job can refuse to merge without the command. A tool the model can see is not a tool the model will call. Count the calls.

### Can the same server drive a Vue app and a Next app?

Playwright clicks the DOM either way. I have not demonstrated that on two apps. The spots that will hurt are shared: an unlabeled control, a login wall, a custom dropdown that is not a `button`, and a success state that is a toast gone in 800 milliseconds. `browser_inspect` reads the text that is on the page at that moment. If the toast is already gone, the check is inconclusive unless you looked in time.

### Headless or not?

Visible while you are debugging the check. Headless when a later CI job only needs the files. Flipping `headless` to `true` does not turn this into a test runner. You still need journeys, fresh contexts, and a status that can be inconclusive.

### Where do I put the files?

`artifacts/`, next to the server, gitignored. Do not commit the PNGs or the videos. Do not point the tools at production.

### Is this a test runner?

Not yet. There are no named journeys, no retries, no isolated contexts, and no report file. There is a browser an agent can drive, and a vocabulary for the report. `run_ui_journey`, returning the types above, is the next piece. An embedded panel is the one after that, and only if you still want it once the files are trustworthy.

Open the modal you think is finished. Type Lunch. Press Save. Read the list out loud before you call it done.
