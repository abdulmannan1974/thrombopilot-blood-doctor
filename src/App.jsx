import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toolCategories, tools } from "./data/tools";
import { markdownByToolId } from "./data/markdownContent";

const getInitialValues = (tool) =>
  tool.inputs.reduce((accumulator, input) => {
    if (input.defaultValue !== undefined) {
      accumulator[input.id] = input.defaultValue;
      return accumulator;
    }

    if (input.type === "checkbox") {
      accumulator[input.id] = false;
      return accumulator;
    }

    if (input.type === "radio" && input.options?.length) {
      accumulator[input.id] = input.options[0].value;
      return accumulator;
    }

    if (input.type === "select" && input.options?.length) {
      accumulator[input.id] = input.options[0].value;
      return accumulator;
    }

    accumulator[input.id] = "";
    return accumulator;
  }, {});

const toolStateDefaults = tools.reduce((accumulator, tool) => {
  accumulator[tool.id] = getInitialValues(tool);
  return accumulator;
}, {});

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeToolId, setActiveToolId] = useState(tools[0]?.id ?? "");
  const [toolValues, setToolValues] = useState(toolStateDefaults);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;

    if (!matchesCategory) {
      return false;
    }

    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return [tool.title, tool.shortTitle, tool.blurb, ...(tool.tags ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  useEffect(() => {
    if (filteredTools.length && !filteredTools.find((tool) => tool.id === activeToolId)) {
      setActiveToolId(filteredTools[0]?.id ?? tools[0]?.id ?? "");
    }
  }, [activeToolId, filteredTools]);

  useEffect(() => {
    setIsLibraryOpen(false);
  }, [activeToolId]);

  const activeTool = filteredTools.length
    ? filteredTools.find((tool) => tool.id === activeToolId) ??
      tools.find((tool) => tool.id === activeToolId) ??
      filteredTools[0]
    : null;

  const activeValues = activeTool ? toolValues[activeTool.id] ?? {} : {};
  const result = activeTool ? activeTool.calculate(activeValues) : null;
  const activeMarkdown = activeTool ? markdownByToolId[activeTool.id] ?? "" : "";

  const stats = {
    total: tools.length,
    algorithms: tools.filter((tool) => tool.category === "algorithm").length,
    scores: tools.filter((tool) => tool.category === "score").length,
    renal: tools.filter((tool) => tool.category === "renal").length,
  };

  const updateValue = (toolId, inputId, value) => {
    setToolValues((current) => ({
      ...current,
      [toolId]: {
        ...current[toolId],
        [inputId]: value,
      },
    }));
  };

  return (
    <div className="app-shell">
      <div className="background-orb orb-a" />
      <div className="background-orb orb-b" />
      <header className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Clinical Decision Support</div>
          <h1>
            ThromboPilot by <span className="brand-lockup">Blood🩸Doctor</span>
          </h1>
          <p className="hero-subtitle">Dr Abdul Mannan FRCPath FCPS</p>
          <p className="hero-description">
            A responsive anticoagulation and thrombosis workspace built for fast
            bedside use on desktop, tablet, and mobile. Search across every tool,
            open a pathway instantly, and review a clean interpretation panel
            without digging through long documents.
          </p>
          <div className="hero-stats">
            <StatCard label="Total tools" value={stats.total} />
            <StatCard label="Algorithms" value={stats.algorithms} />
            <StatCard label="Scores" value={stats.scores} />
            <StatCard label="Renal" value={stats.renal} />
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="mini-label">Why it works</span>
            <h2>One workspace, all decision layers</h2>
            <ul className="feature-list">
              <li>Structured scores for PE, DVT, AF, cancer-associated VTE, ACS, and TIA</li>
              <li>Interactive pathways for perioperative planning, AF dosing, thrombophilia testing, and VITT</li>
              <li>Touch-friendly controls with a focused reading surface for ward rounds and clinic</li>
            </ul>
          </div>
        </div>
      </header>

      <section className="toolbar">
        <div className="mobile-nav-bar">
          <button
            type="button"
            className="mobile-library-toggle"
            onClick={() => setIsLibraryOpen(true)}
          >
            Browse tools
          </button>
          {activeTool ? (
            <div className="active-tool-pill">
              <span className="mini-label">Current tool</span>
              <strong>{activeTool.shortTitle}</strong>
            </div>
          ) : null}
        </div>

        <label className="search-field toolbar-search">
          <span>Find a tool</span>
          <input
            type="search"
            placeholder="Search PE, AF, perioperative, renal..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className="category-pills toolbar-pills" role="tablist" aria-label="Tool categories">
          {toolCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={selectedCategory === category.id ? "pill active" : "pill"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <main className="workspace">
        <button
          type="button"
          className={isLibraryOpen ? "library-backdrop open" : "library-backdrop"}
          aria-label="Close tool index"
          onClick={() => setIsLibraryOpen(false)}
        />

        <aside className={isLibraryOpen ? "tool-list-panel open" : "tool-list-panel"}>
          <div className="panel-heading">
            <h2>Tool Library</h2>
            <div className="panel-heading-actions">
              <span>{filteredTools.length} visible</span>
              <button
                type="button"
                className="panel-close"
                onClick={() => setIsLibraryOpen(false)}
              >
                Close
              </button>
            </div>
          </div>

          <div className="drawer-controls">
            <label className="search-field">
              <span>Find a tool</span>
              <input
                type="search"
                placeholder="Search PE, AF, perioperative..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <div className="category-pills drawer-pills" role="tablist" aria-label="Tool categories">
              {toolCategories.map((category) => (
                <button
                  key={`drawer-${category.id}`}
                  type="button"
                  className={selectedCategory === category.id ? "pill active" : "pill"}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tool-list">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                className={tool.id === activeTool?.id ? "tool-card active" : "tool-card"}
                onClick={() => {
                  setActiveToolId(tool.id);
                  setIsLibraryOpen(false);
                }}
              >
                <div className="tool-card-top">
                  <span className="tool-badge">{tool.badge}</span>
                  <span className="tool-category">
                    {tool.category === "score"
                      ? "Score"
                      : tool.category === "algorithm"
                        ? "Algorithm"
                        : "Renal"}
                  </span>
                </div>
                <h3>{tool.shortTitle}</h3>
                <p>{tool.blurb}</p>
                <div className="tag-row">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="detail-panel">
          {activeTool ? (
            <>
              <div className="detail-header">
                <div>
                  <span className="detail-badge">{activeTool.badge}</span>
                  <h2>{activeTool.title}</h2>
                  <p>{activeTool.blurb}</p>
                </div>
                <div className="detail-note-card">
                  <span className="mini-label">Use notes</span>
                  <ul className="feature-list compact">
                    {activeTool.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="detail-grid">
                <div className="input-card">
                  <div className="panel-heading">
                    <h3>Inputs</h3>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        setToolValues((current) => ({
                          ...current,
                          [activeTool.id]: getInitialValues(activeTool),
                        }))
                      }
                    >
                      Reset
                    </button>
                  </div>

                  <div className="form-grid">
                    {activeTool.inputs
                      .filter((input) => input.type !== "hidden")
                      .map((input) => (
                        <FieldRenderer
                          key={input.id}
                          input={input}
                          value={activeValues[input.id]}
                          onChange={(value) => updateValue(activeTool.id, input.id, value)}
                        />
                      ))}
                  </div>
                </div>

                <ResultCard result={result} />
              </div>

              <ClinicalReference
                title={activeTool.title}
                markdown={activeMarkdown}
              />
            </>
          ) : (
            <div className="empty-state">
              <span className="detail-badge">No matches</span>
              <h2>Try a broader search term</h2>
              <p>
                No tools match the current filters. Clear the search box or switch
                back to a wider category to keep exploring.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>
          For clinician use only. Confirm every recommendation against patient
          context, local policy, and current evidence before prescribing or
          escalating care.
        </p>
      </footer>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FieldRenderer({ input, value, onChange }) {
  if (input.type === "checkbox") {
    return (
      <label className="field checkbox-field">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{input.label}</span>
      </label>
    );
  }

  if (input.type === "radio") {
    return (
      <fieldset className="field radio-group">
        <legend>{input.label}</legend>
        <div className="radio-options">
          {input.options.map((option) => (
            <label
              key={option.value}
              className={value === option.value ? "radio-option selected" : "radio-option"}
            >
              <input
                type="radio"
                name={input.id}
                value={option.value}
                checked={value === option.value}
                onChange={(event) => onChange(event.target.value)}
              />
              <span className="radio-copy">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (input.type === "select") {
    return (
      <label className="field">
        <span>{input.label}</span>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {input.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="field">
      <span>{input.label}</span>
      <input
        type="number"
        min={input.min}
        max={input.max}
        step={input.step ?? 1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ResultCard({ result }) {
  return (
    <div className={`result-card ${result.tone ?? "neutral"}`}>
      <div className="panel-heading">
        <h3>Interpretation</h3>
      </div>

      <div className="result-primary">
        <span className="result-kicker">Outcome</span>
        <h4>{result.headline}</h4>
        {result.summary ? <p>{result.summary}</p> : null}
      </div>

      {result.action ? (
        <div className="action-banner">
          <span className="mini-label">Recommended next move</span>
          <p>{result.action}</p>
        </div>
      ) : null}

      {result.metrics?.length ? (
        <div className="metric-grid">
          {result.metrics.map((metric) => (
            <div key={`${metric.label}-${metric.value}`} className="metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      ) : null}

      {result.recommendations?.length ? (
        <div className="recommendation-list">
          {result.recommendations.map((item) => (
            <div key={`${item.label}-${item.value}`} className="recommendation-item">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      ) : null}

      {result.supporting?.length ? (
        <ul className="feature-list compact result-list">
          {result.supporting.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ClinicalReference({ title, markdown }) {
  return (
    <section className="reference-card">
      <div className="panel-heading">
        <div>
          <h3>Full Clinical Detail</h3>
          <span>Complete transformed source content for {title}</span>
        </div>
      </div>

      <details className="reference-disclosure" open>
        <summary>Open full criteria, thresholds, applications, and references</summary>
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h4 {...props} />,
              h2: ({ node, ...props }) => <h5 {...props} />,
              h3: ({ node, ...props }) => <h6 {...props} />,
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noreferrer" />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </details>
    </section>
  );
}

export default App;
