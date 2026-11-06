import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  Download,
  Eye,
  FileSearch,
  FileText,
  Globe,
  Highlighter,
  ListChecks,
  Mail,
  MessageCircleQuestion,
  Pause,
  Play,
  Scale,
  ScrollText,
  Send,
  ShieldCheck,
  Table,
  UserCheck,
} from 'lucide-react';
import { getAssetPath } from '../lib/assets';

/*
 * "How this application was built" — an unlisted page for the NEXT/NOW
 * Creative Technologist AI application. Content comes from the hand-off prompt
 * and the fact sheet; anything not yet confirmed renders as a yellow <Placeholder>.
 *
 * Assets William still has to supply. Set a path (relative to public/) to switch
 * the matching section or button on; leave null to keep it hidden.
 */
interface PageAssets {
  resumePdf: string | null; // the final tailored resume, yellow placeholders filled
  weirdBuildClip: string | null; // looping clip of the Pico/ESP8266 LED build (.mp4)
}

const PAGE_ASSETS: PageAssets = {
  resumePdf: null,
  weirdBuildClip: null,
};

interface Stage {
  short: string;
  title: string;
  icon: React.ElementType;
  does: string;
  input: string;
  output: string;
  thisRun: React.ReactNode;
}

interface Guardrail {
  title: string;
  detail: string;
  icon: React.ElementType;
}

const Placeholder: React.FC<{ children: React.ReactNode; note: string }> = ({ children, note }) => (
  <mark
    className="bg-yellow-200 text-deep-indigo rounded px-1 font-semibold"
    title={`Placeholder: ${note}`}
  >
    {children}
    <span className="sr-only"> (placeholder: {note})</span>
  </mark>
);

const STAGES: Stage[] = [
  {
    short: 'Sources',
    title: 'Sources of truth',
    icon: Database,
    does: 'Before writing a word, the agent loads five sources. Resumes and letters may use only what is in them.',
    input:
      'A verified fact sheet (every confirmed number and story, dated), voice samples, the master resume (.docx), this site’s project data, and the application tracker (a Google Sheet).',
    output: 'A fixed set of facts the agent is allowed to use, and a voice to write in: warm, curious, signed “Fantastically,”.',
    thisRun:
      'The fact sheet also lists don’ts: no tools he hasn’t used, no inflated numbers, no agency PM years he doesn’t have.',
  },
  {
    short: 'Skill',
    title: 'A reusable skill',
    icon: ScrollText,
    does: 'William’s process, written down as a step-by-step procedure the agent loads every time. Same steps, every application.',
    input: 'The skill: a written procedure, not a one-off prompt.',
    output: 'A repeatable run. The first one was in October 2026.',
    thisRun: (
      <>
        Applications run through it so far: <Placeholder note="William to confirm the count">[N]</Placeholder>.
      </>
    ),
  },
  {
    short: 'Posting',
    title: 'Read the posting',
    icon: FileSearch,
    does: 'Fetches the posting and summarizes the role, the required and preferred qualifications, the tools named, and the logistics.',
    input: 'The NEXT/NOW Creative Technologist AI posting.',
    output: 'A one-screen brief of the role.',
    thisRun:
      'The asks it pulled out: an “AI-native builder,” “generative pipelines and custom workflows,” and AI used “intentionally, not as a gimmick.”',
  },
  {
    short: 'Research',
    title: 'Research the organization',
    icon: Globe,
    does: 'Opens the organization’s actual pages, not search snippets, and cites them.',
    input: 'NEXT/NOW’s homepage, About page, and a case study.',
    output: 'Cited notes on who they are and what they build.',
    thisRun:
      'The GE HealthCare AI Innovation Booth: a 30-foot LED halo whose 360° imagery shifts as guests explore on a touchscreen, plus motion-reactive pillars.',
  },
  {
    short: 'Fit',
    title: 'Map fit honestly',
    icon: Scale,
    does: 'Matches each requirement to a verified fact, then names the strengths and the real gaps.',
    input: 'The role brief and the fact sheet.',
    output: 'A fit map: strengths, gaps, nothing stretched.',
    thisRun: (
      <div className="space-y-3">
        <p>
          <span className="font-semibold text-tech-teal">Strengths: </span>
          B.S. in Computer Engineering (Columbia), the IoT physical-computing course he designed and taught,
          MicroPython on Raspberry Pi Pico and ESP8266, fabrication, Unreal Engine, generative imagery for
          storytelling, daily AI coding, and install work at McCormick Place.
        </p>
        <p>
          <span className="font-semibold text-deep-indigo">Gaps it named: </span>
          no TouchDesigner, ComfyUI, or WebGL yet. No agency years.
        </p>
      </div>
    ),
  },
  {
    short: 'Ask',
    title: 'Ask, don’t guess',
    icon: MessageCircleQuestion,
    does: 'Where the fact sheet is silent, the agent asks William a focused question instead of guessing. His answers go back into the fact sheet with the date.',
    input: 'The holes in the fact sheet.',
    output: 'New, dated facts. The source of truth grows with every run.',
    thisRun:
      'It asked which real-time and generative tools he has actually used. His answers were saved on November 5, 2026.',
  },
  {
    short: 'Generate',
    title: 'Generate in his style',
    icon: FileText,
    does: 'A Python script rebuilds the .docx from his own template’s XML: fonts, header, watermark, tab stops. Every page is rendered to PDF with LibreOffice and checked visually.',
    input: 'The fit map and the master resume template.',
    output: 'A tailored resume. Anything unconfirmed goes in as a yellow placeholder, never made up.',
    thisRun: 'Sections reordered to lead with “Interactive, AI & Build Work.”',
  },
  {
    short: 'Track',
    title: 'Track',
    icon: Table,
    does: 'Adds or updates the tracker row on its own: role, link, status, next step, file paths, and gaps.',
    input: 'Everything above.',
    output: 'One up-to-date row per application.',
    thisRun: 'No copy-pasting into a spreadsheet afterward. The row is part of the run.',
  },
  {
    short: 'Verdict',
    title: 'An honest verdict',
    icon: ListChecks,
    does: 'Ends every run with a candid read: how convincing the application is, what would raise the odds, and what William must verify before sending.',
    input: 'The finished drafts.',
    output: 'A verdict and a verify-before-sending checklist.',
    thisRun: 'The agent sends nothing. William approves, edits, and sends.',
  },
  {
    short: 'Hand-off',
    title: 'Hand-off',
    icon: Send,
    does: 'This page was built by a second agent, the portfolio agent, from a structured hand-off prompt that the first agent wrote.',
    input: 'The hand-off: content, style rules, privacy rules, and a definition of done.',
    output: 'The page you’re reading.',
    thisRun:
      'The hand-off spelled out what stays private: no raw fact sheet, no tracker contents, no full prompts.',
  },
];

const GUARDRAILS: Guardrail[] = [
  { title: 'Only verified facts', detail: 'No estimating, no inflating.', icon: ShieldCheck },
  { title: 'Placeholders stay yellow', detail: 'Visible, never silently filled.', icon: Highlighter },
  { title: 'Ask before assuming', detail: 'New facts are saved with a date.', icon: MessageCircleQuestion },
  { title: 'A human decides', detail: 'William approves, edits, and sends everything.', icon: UserCheck },
  { title: 'Check the output', detail: 'Render and look at every page. Cite the research.', icon: Eye },
  { title: 'Name the gaps', detail: 'Be candid about them instead of hiding them.', icon: Scale },
];

const TOOLS = ['web fetch', 'Google Sheets', 'files on William’s computer', 'Python + LibreOffice'];

const AUTOPLAY_MS = 2600;

const StageDetail: React.FC<{ stage: Stage }> = ({ stage }) => (
  <div className="grid gap-6 lg:grid-cols-5">
    <div className="lg:col-span-3 space-y-4">
      <p className="text-deep-indigo leading-relaxed">{stage.does}</p>
      <dl className="grid gap-3 sm:grid-cols-2 text-sm">
        <div className="rounded-lg bg-soft-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-gray mb-1">In</dt>
          <dd className="text-deep-indigo leading-relaxed">{stage.input}</dd>
        </div>
        <div className="rounded-lg bg-soft-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-gray mb-1">Out</dt>
          <dd className="text-deep-indigo leading-relaxed">{stage.output}</dd>
        </div>
      </dl>
    </div>
    <div className="lg:col-span-2 rounded-lg border-l-4 border-tech-teal bg-tech-teal/5 p-4 text-sm text-deep-indigo leading-relaxed">
      <p className="text-xs font-semibold uppercase tracking-wider text-tech-teal mb-2">This run</p>
      {typeof stage.thisRun === 'string' ? <p>{stage.thisRun}</p> : stage.thisRun}
    </div>
  </div>
);

const NextNowPage: React.FC = () => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  const [tailored, setTailored] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = STAGES.length - 1;

  // Unlisted page: keep it out of search results and give the tab a clear title.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'How this application was built · William Ryan';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, []);

  // "Run the pipeline": step through the stages once, then stop.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      const next = active + 1;
      setActive(next);
      if (next >= last) setPlaying(false);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, last]);

  const selectStage = (index: number) => {
    setPlaying(false);
    setActive(index);
    setMobileCollapsed(false);
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (active >= last) setActive(0);
    setMobileCollapsed(false);
    setPlaying(true);
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    selectStage(next);
    tabRefs.current[next]?.focus();
  };

  const stage = STAGES[active];
  const ActiveIcon = stage.icon;

  // Resume mock for the "reordered" before/after. Other sections are drawn as
  // unlabeled bars on purpose: only the moved section is a confirmed detail.
  const masterOrder = ['a', 'b', 'c', 'focus'];
  const tailoredOrder = ['focus', 'a', 'b', 'c'];
  const order = tailored ? tailoredOrder : masterOrder;
  const barWidths: Record<string, string> = { a: 'w-2/3', b: 'w-1/2', c: 'w-3/5' };

  return (
    <div className="min-h-screen bg-soft-white text-deep-indigo">
      {/* Navigation Header */}
      <div className="bg-soft-white border-b border-slate-gray/10 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={getAssetPath('personalLogoV2grey.svg')} alt="William Ryan Logo" className="w-8" />
            <span className="hidden sm:inline text-xl font-bold text-deep-indigo hover:text-signal-blue transition-colors">
              william ryan
            </span>
          </Link>

          <div className="flex items-center gap-5 sm:gap-8">
            <Link to="/" className="text-slate-gray hover:text-deep-indigo font-medium">
              work
            </Link>
            <Link to="/about" className="text-slate-gray hover:text-deep-indigo font-medium">
              about
            </Link>
            <Link to="/bookshelf" className="text-slate-gray hover:text-deep-indigo font-medium">
              the bookshelf
            </Link>
          </div>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 animate-fade-in">
          <p className="inline-flex items-center gap-2 rounded-full bg-signal-blue/10 px-3 py-1 text-sm font-medium text-signal-blue">
            <span className="h-2 w-2 rounded-full bg-tech-teal" aria-hidden="true" />
            For NEXT/NOW · Creative Technologist AI
          </p>
          <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight text-deep-indigo">
            How this application was built
          </h1>
          <p className="mt-6 max-w-3xl text-lg sm:text-xl text-slate-gray leading-relaxed">
            NEXT/NOW asked for an AI-native builder. Instead of telling you I am one, here’s the pipeline that
            built this application, guardrails included.
          </p>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-xl border border-slate-gray/15 bg-slate-gray/15">
            {[
              ['Run on', 'Nov 5, 2026'],
              ['Stages', '10'],
              ['Guardrails', '6'],
              ['Final say', 'William'],
            ].map(([label, value]) => (
              <div key={label} className="bg-white px-4 py-4 sm:px-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-gray">{label}</dt>
                <dd className="mt-1 text-xl sm:text-2xl font-bold text-deep-indigo">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#pipeline"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal-blue px-6 py-3 font-medium text-soft-white hover:bg-signal-blue/90"
            >
              Walk the pipeline
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href="#who"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-gray/25 px-6 py-3 font-medium text-deep-indigo hover:border-signal-blue hover:text-signal-blue"
            >
              Who’s behind it
            </a>
          </div>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="scroll-mt-4 bg-white border-y border-slate-gray/10 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-tech-teal">The pipeline</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-deep-indigo">Ten stages, one human deciding</h2>
                <p className="mt-4 text-slate-gray leading-relaxed">
                  Claude ran it agentically, with tools. William directed it and made every decision. Pick a stage,
                  or let it run.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools the agent used">
                  {TOOLS.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-slate-gray/20 bg-soft-white px-3 py-1 text-xs font-medium text-slate-gray"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center justify-center gap-2 self-start md:self-auto rounded-lg bg-deep-indigo px-5 py-3 font-medium text-soft-white hover:bg-signal-blue"
              >
                {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
                {playing ? 'Pause' : active >= last ? 'Run it again' : 'Run the pipeline'}
              </button>
            </div>

            {/* Desktop: horizontal flow + panel */}
            <div className="hidden md:block mt-12">
              <div className="relative">
                <div className="absolute top-6 left-[5%] right-[5%] h-0.5 bg-slate-gray/15" aria-hidden="true" />
                <div
                  className="absolute top-6 left-[5%] h-0.5 bg-signal-blue transition-all duration-500 ease-out motion-reduce:transition-none"
                  style={{ width: `${(active / last) * 90}%` }}
                  aria-hidden="true"
                />
                <div
                  role="tablist"
                  aria-label="Pipeline stages"
                  className="relative grid grid-cols-10"
                  onKeyDown={onTabKeyDown}
                >
                  {STAGES.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i === active;
                    const isDone = i < active;
                    return (
                      <button
                        key={s.short}
                        ref={(el) => {
                          tabRefs.current[i] = el;
                        }}
                        id={`stage-tab-${i}`}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        aria-controls="stage-panel"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => selectStage(i)}
                        className="group flex flex-col items-center gap-2 rounded-lg px-1 pb-1 focus-visible:outline-offset-4"
                      >
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 motion-reduce:transition-none ${
                            isActive
                              ? 'scale-110 border-signal-blue bg-signal-blue text-soft-white shadow-lg shadow-signal-blue/30'
                              : isDone
                                ? 'border-signal-blue bg-white text-signal-blue'
                                : 'border-slate-gray/25 bg-white text-slate-gray group-hover:border-signal-blue group-hover:text-signal-blue'
                          }`}
                        >
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span
                          className={`text-xs font-medium leading-tight ${
                            isActive ? 'text-deep-indigo' : 'text-slate-gray group-hover:text-deep-indigo'
                          }`}
                        >
                          <span className="block text-[10px] text-slate-gray/80">{i}</span>
                          {s.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                id="stage-panel"
                role="tabpanel"
                aria-labelledby={`stage-tab-${active}`}
                tabIndex={0}
                className="mt-8 rounded-2xl border border-slate-gray/15 bg-white p-6 lg:p-8 shadow-sm"
              >
                <div key={active} className="stage-in">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-blue/10 text-signal-blue">
                      <ActiveIcon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-gray">
                        Stage {active}
                      </p>
                      <h3 className="text-xl font-bold text-deep-indigo">{stage.title}</h3>
                    </div>
                  </div>
                  <StageDetail stage={stage} />
                </div>
                <div className="mt-6 flex justify-between border-t border-slate-gray/10 pt-4">
                  <button
                    type="button"
                    onClick={() => selectStage(active - 1)}
                    disabled={active === 0}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-slate-gray hover:text-signal-blue disabled:opacity-30 disabled:hover:text-slate-gray"
                  >
                    <ChevronLeft size={16} aria-hidden="true" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => selectStage(active + 1)}
                    disabled={active === last}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-slate-gray hover:text-signal-blue disabled:opacity-30 disabled:hover:text-slate-gray"
                  >
                    Next <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile: vertical flow, each stage expands in place */}
            <div className="md:hidden mt-10 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-gray/15" aria-hidden="true" />
              <ol className="relative">
              {STAGES.map((s, i) => {
                const Icon = s.icon;
                const isOpen = i === active && !mobileCollapsed;
                const isReached = i <= active;
                return (
                  <li key={s.short} className="relative pb-3">
                    <h3>
                      <button
                        type="button"
                        id={`stage-acc-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`stage-acc-panel-${i}`}
                        onClick={() => (i === active ? setMobileCollapsed(!mobileCollapsed) : selectStage(i))}
                        className="flex w-full items-center gap-3 rounded-lg text-left"
                      >
                        <span
                          className={`relative flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none ${
                            i === active
                              ? 'border-signal-blue bg-signal-blue text-soft-white'
                              : isReached
                                ? 'border-signal-blue bg-white text-signal-blue'
                                : 'border-slate-gray/25 bg-white text-slate-gray'
                          }`}
                        >
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-xs text-slate-gray">Stage {i}</span>
                          <span className="block font-semibold text-deep-indigo">{s.title}</span>
                        </span>
                        <ChevronDown
                          size={18}
                          aria-hidden="true"
                          className={`text-slate-gray transition-transform duration-300 motion-reduce:transition-none ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={`stage-acc-panel-${i}`}
                        role="region"
                        aria-labelledby={`stage-acc-${i}`}
                        className="stage-in ml-[3.75rem] mt-3 mb-3"
                      >
                        <StageDetail stage={s} />
                      </div>
                    )}
                  </li>
                );
              })}
              </ol>
            </div>
          </div>
        </section>

        {/* Guardrails */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-tech-teal">Guardrails</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-deep-indigo">Six rules it runs by</h2>
          <p className="mt-4 max-w-2xl text-slate-gray leading-relaxed">
            The useful part isn’t that an agent wrote a resume. It’s that the agent isn’t allowed to quietly make things up.
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUARDRAILS.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <li
                  key={rule.title}
                  className="flex gap-4 rounded-xl border border-slate-gray/15 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal-blue/40 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-tech-teal/10 text-tech-teal">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-deep-indigo">
                      <span className="text-slate-gray/70 mr-1.5">{i + 1}.</span>
                      {rule.title === 'Placeholders stay yellow' ? (
                        <>
                          Placeholders stay <span className="bg-yellow-200 rounded px-1">yellow</span>
                        </>
                      ) : (
                        rule.title
                      )}
                    </p>
                    <p className="mt-1 text-sm text-slate-gray leading-relaxed">{rule.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* The time it said no */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="overflow-hidden rounded-2xl bg-deep-indigo text-soft-white grid lg:grid-cols-2">
            <div className="p-6 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-warm-sand">November 4, 2026</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold">The time it said no</h2>
              <div className="mt-5 space-y-4 text-soft-white/80 leading-relaxed">
                <p>
                  The day before NEXT/NOW, the workflow read a museum design posting. Before any drafting, it flagged
                  that the role was limited-term and its start date had already passed. William can’t start full-time
                  until April 2027.
                </p>
                <p>
                  He chose to pass. The tracker logged the decision, and no time went into materials that couldn’t
                  succeed.
                </p>
                <p className="font-semibold text-soft-white">Judgment over volume.</p>
              </div>
            </div>
            <div className="bg-black/20 p-6 sm:p-10 font-mono text-xs sm:text-sm leading-7">
              <p className="mb-3 text-soft-white/50" aria-hidden="true">
                ● ● ●
              </p>
              <ul className="space-y-1">
                <li>
                  <span className="text-tech-teal">posting</span> · museum design role
                </li>
                <li>
                  <span className="text-warm-sand">flag</span> · limited-term
                </li>
                <li>
                  <span className="text-warm-sand">flag</span> · start date already passed
                </li>
                <li>
                  <span className="text-warm-sand">flag</span> · full-time start: April 2027
                </li>
                <li>
                  <span className="text-signal-blue">decision</span> · pass (William)
                </li>
                <li>
                  <span className="text-tech-teal">tracker</span> · logged
                </li>
                <li>
                  <span className="text-tech-teal">drafts</span> · 0
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What it produced */}
        <section className="bg-white border-y border-slate-gray/10 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-tech-teal">The output</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-deep-indigo">What it produced</h2>
            <p className="mt-4 max-w-2xl text-slate-gray leading-relaxed">
              A tailored resume, rebuilt from William’s own template: Inter type, his header, right-aligned dates,
              and the faint hexagon watermark.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* Before / after: section reorder */}
              <div className="rounded-2xl border border-slate-gray/15 bg-soft-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-deep-indigo">Reordered for this role</h3>
                  <div className="inline-flex rounded-lg bg-white p-1 border border-slate-gray/15" role="group" aria-label="Resume section order">
                    <button
                      type="button"
                      aria-pressed={!tailored}
                      onClick={() => setTailored(false)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                        !tailored ? 'bg-deep-indigo text-soft-white' : 'text-slate-gray hover:text-deep-indigo'
                      }`}
                    >
                      Master
                    </button>
                    <button
                      type="button"
                      aria-pressed={tailored}
                      onClick={() => setTailored(true)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                        tailored ? 'bg-signal-blue text-soft-white' : 'text-slate-gray hover:text-deep-indigo'
                      }`}
                    >
                      For NEXT/NOW
                    </button>
                  </div>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-lg bg-white p-5 shadow-sm" aria-hidden="true">
                  <img
                    src={getAssetPath('personalLogoV2grey.svg')}
                    alt=""
                    className="pointer-events-none absolute right-4 bottom-2 w-28 opacity-[0.07]"
                  />
                  <div className="mx-auto mb-1 h-3 w-1/3 rounded bg-deep-indigo/70" />
                  <div className="mx-auto mb-5 h-2 w-1/2 rounded bg-slate-gray/30" />
                  <div className="relative h-[164px]">
                    {masterOrder.map((key) => {
                      const top = order.indexOf(key) * 44;
                      const isFocus = key === 'focus';
                      return (
                        <div
                          key={key}
                          className="absolute inset-x-0 h-9 transition-transform duration-700 ease-in-out motion-reduce:transition-none"
                          style={{ transform: `translateY(${top}px)` }}
                        >
                          {isFocus ? (
                            <div
                              className={`flex h-full items-center rounded-md px-3 text-xs sm:text-sm font-semibold uppercase tracking-wide underline underline-offset-4 transition-colors duration-700 ${
                                tailored ? 'bg-signal-blue/10 text-signal-blue' : 'bg-slate-gray/5 text-slate-gray'
                              }`}
                            >
                              Interactive, AI &amp; Build Work
                            </div>
                          ) : (
                            <div className="flex h-full flex-col justify-center gap-1.5 px-3">
                              <div className={`h-2 rounded bg-slate-gray/30 ${barWidths[key]}`} />
                              <div className="h-1.5 w-5/6 rounded bg-slate-gray/15" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-gray" aria-live="polite">
                  {tailored
                    ? 'For NEXT/NOW, “Interactive, AI & Build Work” moves to the top.'
                    : 'In the master resume, it sits further down. (Other sections simplified.)'}
                </p>
              </div>

              {/* Placeholders */}
              <div className="rounded-2xl border border-slate-gray/15 bg-soft-white p-5 sm:p-6">
                <h3 className="text-lg font-bold text-deep-indigo">Unknowns stay yellow</h3>
                <p className="mt-3 text-slate-gray leading-relaxed">
                  If the fact sheet can’t back something up, it goes in as a yellow placeholder. William fills it or
                  cuts it before anything is sent.
                </p>
                <div className="mt-5 rounded-lg bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-gray mb-2">
                    This page has one too
                  </p>
                  <p className="text-deep-indigo leading-relaxed">
                    The workflow has run on{' '}
                    <Placeholder note="William to confirm the count">[N]</Placeholder> applications since October
                    2026.
                  </p>
                </div>
                <p className="mt-4 text-sm text-slate-gray">
                  It stays yellow until William confirms the number.
                </p>
              </div>
            </div>

            {PAGE_ASSETS.resumePdf && (
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={getAssetPath(PAGE_ASSETS.resumePdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal-blue px-6 py-3 font-medium text-soft-white hover:bg-signal-blue/90"
                >
                  View the tailored resume
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={getAssetPath(PAGE_ASSETS.resumePdf)}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-gray/25 px-6 py-3 font-medium text-deep-indigo hover:border-signal-blue hover:text-signal-blue"
                >
                  <Download size={18} aria-hidden="true" />
                  Download PDF
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Built something weird (hidden until the clip exists) */}
        {PAGE_ASSETS.weirdBuildClip && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-tech-teal">Side project</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-deep-indigo">Built something weird</h2>
            <video
              src={getAssetPath(PAGE_ASSETS.weirdBuildClip)}
              className="mt-8 w-full rounded-2xl bg-deep-indigo"
              autoPlay
              loop
              muted
              playsInline
            />
          </section>
        )}

        {/* Who's behind it */}
        <section id="who" className="scroll-mt-4 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid gap-8 md:grid-cols-[auto,1fr] md:items-start">
            <img
              src={getAssetPath('headshot_small.jpg')}
              alt="William Ryan"
              className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover shadow-md"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-tech-teal">Who’s behind it</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-deep-indigo">William T. Ryan</h2>
              <p className="mt-2 text-lg text-slate-gray">Designer, technologist, and storyteller.</p>
              <ul className="mt-6 space-y-3 text-deep-indigo leading-relaxed">
                <li className="flex gap-3">
                  <ArrowRight size={18} className="mt-1 flex-none text-signal-blue" aria-hidden="true" />
                  <span>
                    B.S. in Computer Engineering, Columbia. M.S. in Engineering, Design &amp; Innovation at
                    Northwestern’s Segal Design Institute, finishing March 2027.
                  </span>
                </li>
                <li className="flex gap-3">
                  <ArrowRight size={18} className="mt-1 flex-none text-signal-blue" aria-hidden="true" />
                  <span>Four years teaching computer science and physical computing.</span>
                </li>
                <li className="flex gap-3">
                  <ArrowRight size={18} className="mt-1 flex-none text-signal-blue" aria-hidden="true" />
                  <span>
                    Daily AI coding with Claude Code, Cursor, Copilot, and LLM APIs. Midjourney for multimodal
                    storytelling. MicroPython on Raspberry Pi Pico and ESP8266. Unreal Engine.
                  </span>
                </li>
                <li className="flex gap-3">
                  <ArrowRight size={18} className="mt-1 flex-none text-signal-blue" aria-hidden="true" />
                  <span>
                    Based in Chicago. Can start part-time in January 2027 and full-time as early as April 1, 2027.
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal-blue px-6 py-3 font-medium text-soft-white hover:bg-signal-blue/90"
                >
                  See the full portfolio
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="mailto:williamryan2027@u.northwestern.edu"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-gray/25 px-6 py-3 font-medium text-deep-indigo hover:border-signal-blue hover:text-signal-blue"
                >
                  <Mail size={18} aria-hidden="true" />
                  Email William
                </a>
                {PAGE_ASSETS.resumePdf && (
                  <a
                    href={getAssetPath(PAGE_ASSETS.resumePdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-gray/25 px-6 py-3 font-medium text-deep-indigo hover:border-signal-blue hover:text-signal-blue"
                  >
                    <FileText size={18} aria-hidden="true" />
                    Resume (PDF)
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer credit */}
      <footer className="border-t border-slate-gray/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-sm text-slate-gray leading-relaxed">
          <p>
            <span className="font-semibold text-deep-indigo">Pipeline:</span> Claude (agentic, with tools), Python,
            Google Sheets. <span className="font-semibold text-deep-indigo">Page:</span> built by a second Claude
            agent from a hand-off prompt. <span className="font-semibold text-deep-indigo">Decisions, edits, and
            every fact:</span> William.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NextNowPage;
