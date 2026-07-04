"use client";
import { useEffect } from "react";

export default function WorkleInteractions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // NAV: background on scroll
    const nav = document.getElementById("nav");
    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    // Smooth-scroll for in-page anchors
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      const handler = (e: MouseEvent) => {
        const id = a.getAttribute("href");
        if (id === "#" || id === "#top") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          return;
        }
        const target = id ? document.querySelector(id) : null;
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      };
      a.addEventListener("click", handler);
      cleanups.push(() => a.removeEventListener("click", handler));
    });

    // Visibility watcher
    type Watcher = { el: Element; cb: () => void; ratio: number };
    const watchers: Watcher[] = [];
    const watch = (el: Element, cb: () => void, ratio = 0.14) =>
      watchers.push({ el, cb, ratio });

    const isInView = (el: Element, ratio: number): boolean => {
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      if (!r.height && !r.width) return false;
      const need = Math.min(r.height * ratio, h * 0.2);
      return r.top < h - need && r.bottom > need;
    };

    const visPass = () => {
      for (let i = watchers.length - 1; i >= 0; i--) {
        if (isInView(watchers[i].el, watchers[i].ratio)) {
          watchers[i].cb();
          watchers.splice(i, 1);
        }
      }
    };

    let visTick = false;
    const scheduleVis = () => {
      if (visTick) return;
      visTick = true;
      setTimeout(() => { visTick = false; visPass(); }, 0);
    };
    window.addEventListener("scroll", scheduleVis, { passive: true });
    window.addEventListener("resize", scheduleVis);
    const visPoll = setInterval(() => {
      visPass();
      if (watchers.length === 0) clearInterval(visPoll);
    }, 280);
    cleanups.push(() => {
      window.removeEventListener("scroll", scheduleVis);
      window.removeEventListener("resize", scheduleVis);
      clearInterval(visPoll);
    });

    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal");
    if (reduce) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      reveals.forEach((el) => watch(el, () => el.classList.add("in")));
    }

    // Marquee chips
    const tasks: [string, string][] = [
      ["POST", "X ターゲット精査型アウトリーチ（50通）"],
      ["POST", "Zenn / note 技術記事 ゴーストライティング"],
      ["POST", "ターゲットリスト抽出 ×200社"],
      ["PATCH", "LP 改善提案・CVR診断"],
      ["GET",  "競合プライシング調査"],
      ["POST", "B2Bフォーム営業 ×50社"],
      ["POST", "SNSアカウント運用代行"],
      ["POST", "プレスリリース配信リスト構築"],
      ["PATCH", "オンボーディング文面の改善"],
      ["GET",  "ユーザーインタビュー設計"],
    ];
    const mq = document.getElementById("marquee");
    if (mq) {
      let html = "";
      for (let p = 0; p < 2; p++) {
        tasks.forEach(([method, label]) => {
          html += `<span class="chip"><span class="tag">${method}</span>${label}</span>`;
        });
      }
      mq.innerHTML = html;
    }

    // ============================================================
    // SEAM — signature animation
    // IntersectionObserver triggers status: REQUEST → IN PROGRESS → DONE
    // prefers-reduced-motion: show DONE state immediately (no transitions)
    // ============================================================
    const seamEl = document.getElementById("seam");
    const seamCard = seamEl?.querySelector<HTMLElement>(".seam-card");
    if (seamEl && seamCard) {
      if (reduce) {
        seamCard.setAttribute("data-status", "done");
      } else {
        let played = false;
        const seamObserver = new IntersectionObserver(
          (entries) => {
            if (!entries[0].isIntersecting || played) return;
            played = true;
            seamObserver.disconnect();

            seamCard.setAttribute("data-status", "request");
            const t1 = setTimeout(() => seamCard.setAttribute("data-status", "progress"), 700);
            const t2 = setTimeout(() => seamCard.setAttribute("data-status", "done"), 1900);
            cleanups.push(() => { clearTimeout(t1); clearTimeout(t2); });
          },
          { threshold: 0.35 }
        );
        seamObserver.observe(seamEl);
        cleanups.push(() => seamObserver.disconnect());
      }
    }

    // ============================================================
    // KANBAN BOARD
    // ============================================================
    const board = document.getElementById("board");
    const layer = board?.querySelector<HTMLElement>(".board-cols");
    if (board && layer) {
      const colEls = {
        req:  document.getElementById("col-req")!,
        run:  document.getElementById("col-run")!,
        done: document.getElementById("col-done")!,
      };
      layer.style.position = "relative";
      const GAP = 12;

      const pool = [
        { tag: "outreach", title: "SaaS創業者へアウトリーチ ×30",      who: "S", role: "sales"   },
        { tag: "content",  title: "Zenn技術記事 ゴーストライティング",   who: "E", role: "eng"     },
        { tag: "list",     title: "ターゲットリスト抽出 ×200社",         who: "E", role: "eng"     },
        { tag: "growth",   title: "LP CVR改善提案",                     who: "T", role: "biz-dev" },
        { tag: "research", title: "競合プライシング調査レポート",         who: "T", role: "biz-dev" },
        { tag: "b2b",      title: "B2Bフォーム営業 ×50社",              who: "S", role: "sales"   },
        { tag: "social",   title: "Xアカウント運用・週7投稿",            who: "S", role: "sales"   },
        { tag: "scrape",   title: "問い合わせリストのスクレイピング構築", who: "E", role: "eng"     },
      ];
      let poolIdx = 0;

      type ColKey = "req" | "run" | "done";
      type CardItem = { el: HTMLElement };
      const state: Record<ColKey, CardItem[]> = { req: [], run: [], done: [] };
      let totalDoneCount = 47;

      const makeCard = (d: (typeof pool)[0]): HTMLElement => {
        const el = document.createElement("div");
        el.className = "kcard";
        el.innerHTML =
          `<div class="k-tag">${d.tag}</div>` +
          `<div class="k-title">${d.title}</div>` +
          `<div class="k-prog"><i></i></div>` +
          `<div class="k-foot" style="margin-top:10px;">` +
          `<span class="k-who"><span class="k-av">${d.who}</span>` +
          `<span class="k-role">@${d.role}</span></span>` +
          `<span class="k-check"></span></div>`;
        layer.appendChild(el);
        return el;
      };

      const colGeom = (key: ColKey) => {
        const r  = colEls[key].getBoundingClientRect();
        const lr = layer.getBoundingClientRect();
        return { x: r.left - lr.left, y: r.top - lr.top, w: r.width };
      };

      const reposition = (instant: boolean) => {
        (["req", "run", "done"] as ColKey[]).forEach((key) => {
          const g = colGeom(key);
          let offset = g.y;
          state[key].forEach((item) => {
            item.el.style.width = `${g.w}px`;
            if (instant) {
              const t = item.el.style.transition;
              item.el.style.transition = "none";
              item.el.style.transform = `translate(${g.x}px,${offset}px)`;
              void item.el.offsetWidth;
              item.el.style.transition = t;
            } else {
              item.el.style.transform = `translate(${g.x}px,${offset}px)`;
            }
            offset += item.el.offsetHeight + GAP;
          });
        });
        const reqCnt  = document.querySelector('[data-cnt="req"]');
        const runCnt  = document.querySelector('[data-cnt="run"]');
        const doneCnt = document.querySelector('[data-cnt="done"]');
        if (reqCnt)  reqCnt.textContent  = String(state.req.length);
        if (runCnt)  runCnt.textContent  = String(state.run.length);
        if (doneCnt) doneCnt.textContent = String(totalDoneCount);
      };

      const addToReq = () => {
        const d = pool[poolIdx++ % pool.length];
        state.req.push({ el: makeCard(d) });
        reposition(false);
      };

      let kanbanTimer: ReturnType<typeof setInterval> | null = null;

      const advance = () => {
        if (state.run.length) {
          const r = state.run.shift()!;
          r.el.classList.remove("is-active");
          r.el.classList.add("is-done");
          const kcheck = r.el.querySelector(".k-check");
          if (kcheck) kcheck.textContent = "✓ shipped";
          totalDoneCount++;
          state.done.push(r);
        }
        if (state.req.length) {
          const q = state.req.shift()!;
          q.el.classList.add("is-active");
          state.run.push(q);
        }
        if (state.req.length < 2) addToReq();
        while (state.done.length > 3) {
          const old = state.done.shift()!;
          old.el.style.opacity = "0";
          old.el.style.transform += " scale(.96)";
          const node = old.el;
          setTimeout(() => node.parentNode?.removeChild(node), 450);
        }
        reposition(false);
      };

      let started = false;
      const start = () => {
        if (started) return;
        started = true;

        addToReq(); addToReq(); addToReq(); // req = [0,1,2]

        const runItem = state.req.shift()!;
        runItem.el.classList.add("is-active");
        state.run.push(runItem);

        for (let i = 0; i < 2; i++) {
          const doneData = pool[poolIdx++ % pool.length];
          const doneItem: CardItem = { el: makeCard(doneData) };
          doneItem.el.classList.add("is-done");
          const kcheck = doneItem.el.querySelector(".k-check");
          if (kcheck) kcheck.textContent = "✓ shipped";
          state.done.push(doneItem);
        }
        totalDoneCount = 45 + state.done.length;

        reposition(true);
        if (!reduce) kanbanTimer = setInterval(advance, 2600);
      };

      if (!reduce) {
        watch(board, start, 0.2);
      } else {
        start();
      }

      let resizeTimer: ReturnType<typeof setTimeout>;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { if (started) reposition(true); }, 120);
      };
      window.addEventListener("resize", handleResize);
      cleanups.push(() => {
        window.removeEventListener("resize", handleResize);
        if (kanbanTimer) clearInterval(kanbanTimer);
      });

      document.fonts?.ready.then(() => { if (started) reposition(true); });
    }

    // Initial visibility pass
    requestAnimationFrame(visPass);
    setTimeout(visPass, 60);
    const loadHandler = () => { visPass(); setTimeout(visPass, 80); };
    window.addEventListener("load", loadHandler);
    cleanups.push(() => window.removeEventListener("load", loadHandler));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
