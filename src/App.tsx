import { useEffect, useRef, useState } from "react";
import { Agentation } from "agentation";
import heroMacbook from "../macbook_for_study_head.webp";
import contactPhoto from "../DSCF5361.jpg";

const TG_USER = "legat_io";
const TG_MESSAGE = "Здравствуйте! Давайте обсудим мой проект!";
const PHONE = "+375444910602";
const PHONE_LABEL = "+375(44)491-06-02";
const EMAIL = "tzavadic@gmail.com";

const services = [
  {
    title: "Лендинг под заявки",
    price: "от 350 BYN",
    text: "Одна страница с сильным оффером, информационные блоки, форма обратной связи, навигация, требования законодательства. Срок: 1-7 дней.",
  },
  {
    title: "Корпоративный сайт",
    price: "от 900 BYN",
    text: "Многостраничный сайт, услуги, легкие интеграции, админ-панель (опционально). Срок: 7-14 дней.",
  },
  {
    title: "Интернет-магазин",
    price: "от 1500 BYN",
    text: "Каталог, админ-панель, корзина, оплата (опционально), аналитика и т. д. Срок: до 30 дней.",
  },
  {
    title: "Редизайн / доработка",
    price: "от 250 BYN",
    text: "Обновление визуала, оптимизация скорости и дизайна текущего сайта без полной перестройки.",
  },
  {
    title: "Сопровождение",
    price: "от 120 BYN",
    text: "Правки, новые блоки, мелкий функционал и техническая поддержка.",
  },
];

const audience = [
  {
    title: "Локальный бизнес",
    text: "Клиники, студии, сервисы и магазины, которым нужен сайт, который приводит звонки и заявки.",
  },
  {
    title: "Эксперты и курсы",
    text: "Специалисты и онлайн-школы: упаковка услуги, формирование доверия и запись на консультацию.",
  },
  {
    title: "Стартапы и продукты",
    text: "Быстрый MVP-сайт или лендинг продукта, чтобы проверить спрос и собрать первые лиды.",
  },
];

const steps = [
  {
    title: "Бриф",
    text: "Уточняем задачу, аудиторию, референсы и цели сайта.",
  },
  {
    title: "Структура",
    text: "Собираем понятный каркас страниц.",
  },
  {
    title: "Дизайн",
    text: "Делаем визуал в вашей стилистике.",
  },
  {
    title: "Разработка",
    text: "Верстаем, подключаем формы, адаптируем под различные устройства.",
  },
  {
    title: "Запуск",
    text: "Арендуем сервер, публикуем сайт, передаем доступы, этапы правок.",
  },
  {
    title: "Гарантия",
    text: "Гарантийная поддержка в течение 2-х недель.",
  },
];

const cases = [
  {
    tag: "Лендинг · услуги",
    title: "Сайт для услуги «Покрытие ванны акрилом»",
    text: "Задача: больше заявок с рекламы. Решение: короткий оффер, кейсы до/после, «Об услуге», форма обратной связи и контакты.",
    result: "Срок исполнения: 3 дня",
    url: "https://akrilvanna-rch.by",
  },
  {
    tag: "Лендинг · услуги",
    title: "Сайт для студии гранита «Мемория»",
    text: "Задача: больше заявок и удобство оформления заказа. Решение: перечень услуг, каталог материалов, калькулятор стоимости, кейсы до/после, интеграции с соцсетями, аналитика.",
    result: "Срок исполнения: 7 дней",
    url: "https://мемория.бел",
  },
  {
    tag: "Лендинг · услуги",
    title: "Сайт для бурения скважин",
    text: "Задача: локализация заказов, новые лиды. Решение: повышение доверия, примеры работ, отображение опыта компании, контакты, интеграция с соцсетями и мессенджерами.",
    result: "Срок исполнения: 2 дня",
    url: "https://gydrosphera.by",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

function useTypedMessage(text: string, active: boolean) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!active) return;
    setValue("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 36);
    return () => window.clearInterval(timer);
  }, [active, text]);

  return value;
}

function telegramHref(text: string) {
  return `https://t.me/${TG_USER}?text=${encodeURIComponent(text)}`;
}

function Site() {
  const rootRef = useReveal();
  const contactRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const typedMessage = useTypedMessage(TG_MESSAGE, chatVisible);
  const [draft, setDraft] = useState("");
  const typingDone = typedMessage.length >= TG_MESSAGE.length;

  useEffect(() => {
    setDraft(typedMessage);
  }, [typedMessage]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const node = contactRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setChatVisible(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container site-header__inner">
          <nav className="nav" aria-label="Основная навигация">
            <a href="#services">Услуги</a>
            <a href="#process">Процесс</a>
            <a href="#cases">Кейсы</a>
            <a href="#contact">Контакты</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__media" aria-hidden="true">
            <img className="hero__bg" src={heroMacbook} alt="" />
            <div className="hero__shade" />
          </div>
          <div className="container hero__content">
            <h1 className="hero__brand">
              <span className="hero__brand-bar">Бар</span>
              <span className="hero__brand-site">
                СА<span className="cyr-short-i">И</span>ТОВ
              </span>
            </h1>
            <div className="hero__copy">
              <p className="hero__title">
                Са<span className="cyr-short-i">и</span>ты на заказ
              </p>
              <p className="hero__lead">
                Получи свой лендинг, корпоративный сайт или онлайн магазин под
                ключ: от идеи до запуска.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary btn--shine" href="#contact">
                  Обсудить проект
                </a>
                <a className="btn btn--ghost btn--ghost-on-dark" href="#cases">
                  Смотреть кейсы
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container">
            <div className="section__head reveal" id="services">
              <h2 className="section__title">Услуги</h2>
                <p className="section__text">
                Цены ориентировочные. Финальная стоимость после брифа.
              </p>
            </div>
            <div className="services">
              {services.map((item) => (
                <a className="service reveal" key={item.title} href="#contact">
                  <div className="service__top">
                    <h3>{item.title}</h3>
                    <span className="service__price">{item.price}</span>
                  </div>
                  <p>{item.text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__head reveal" id="process">
              <h2 className="section__title">
                Дорожная карта{" "}
                <span className="section__title-accent">создания сайта</span>
              </h2>
              <p className="section__text">
                На каждом этапе понятно, что происходит и что нужно от вас.
              </p>
            </div>
            <div className="process">
              {steps.map((step) => (
                <article className="process__item reveal" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__head reveal" id="cases">
              <h2 className="section__title">
                Работаю с{" "}
                <span className="section__title-accent">задачами бизнеса</span>
              </h2>
              <p className="section__text">
                Эффективный сайт для вашего бизнеса.
              </p>
            </div>
            <div className="audience">
              {audience.map((item) => (
                <article className="audience__item reveal" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <h3 className="section__subtitle reveal">Примеры работ</h3>
            <div className="cases">
              {cases.map((item) => (
                <article className="case reveal" key={item.title}>
                  <a
                    className="case__media"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Открыть сайт: ${item.title}`}
                  >
                    <img
                      className="case__preview"
                      src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1200`}
                      alt=""
                    />
                    <span className="case__tag">{item.tag}</span>
                  </a>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="case__meta">
                      <span>{item.result}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--contact" ref={contactRef}>
          <div className="contact-media" aria-hidden="true">
            <img className="contact-media__img" src={contactPhoto} alt="" />
            <div className="contact-media__shade" />
          </div>
          <div className="container contact">
            <div className="section__head reveal" id="contact">
              <h2 className="section__title">
                <span className="section__title-accent">Обсудим</span> ваш проект
              </h2>
              <p className="section__text">
                Напишите в Telegram — переходим к обсуждению в течение 10 минут.
              </p>
            </div>

            <form
              className="chat-bar reveal"
              onSubmit={(event) => {
                event.preventDefault();
                window.open(telegramHref(draft || TG_MESSAGE), "_blank", "noopener,noreferrer");
              }}
            >
                <label className="visually-hidden" htmlFor="telegram-message">
                  Сообщение в Telegram
                </label>
                <input
                  id="telegram-message"
                  className="chat-bar__input"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  readOnly={!typingDone && chatVisible}
                  placeholder={TG_MESSAGE}
                />
                <button className="chat-bar__send" type="submit" aria-label="Отправить в Telegram">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M3.4 11.2 19.2 4.4c.7-.3 1.4.4 1.1 1.1l-6.8 15.8c-.3.8-1.5.8-1.8 0l-2.5-6.3-6.3-2.5c-.8-.3-.8-1.5 0-1.8Zm8 2.3 1.8 4.5 4.8-11.2-6.6 6.7Z"
                    />
                  </svg>
                </button>
              </form>

              <div className="contact-links">
                <a className="contact-chip reveal" href={`https://t.me/${TG_USER}`} target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.64 6.8-1.55 7.3c-.12.54-.43.67-.87.42l-2.4-1.77-1.16 1.12c-.13.13-.24.24-.49.24l.17-2.43 4.45-4.02c.19-.17-.04-.27-.3-.1l-5.5 3.46-2.37-.74c-.52-.16-.53-.52.1-.78l9.26-3.57c.43-.16.81.1.66.74Z"
                    />
                  </svg>
                  Telegram · @{TG_USER}
                </a>
                <a className="contact-chip reveal" href={`tel:${PHONE}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02l-2.2 2.19Z"
                    />
                  </svg>
                  {PHONE_LABEL}
                </a>
                <a className="contact-chip reveal" href={`viber://chat?number=%2B${PHONE.replace("+", "")}`}>
                  <svg viewBox="2.8 1.7 19 19.8" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M11.4 2C6.8 2.1 3.1 5.7 3 10.3v.3c0 1.9.6 3.7 1.7 5.2L3.5 21l5.4-1.4c1.4.8 3 1.2 4.6 1.2h.1c4.6-.1 8.3-3.8 8.4-8.4.1-4.6-3.6-8.4-8.4-8.4h-.2Zm4.9 12.2c-.2.6-1.2 1.1-1.9 1.2-.5.1-1.1.1-1.8-.1-4.1-1.7-6.8-5.7-7-6-.2-.3-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9c.3-.3.7-.5 1-.5h.7c.2 0 .5 0 .7.6.2.6.8 2.1.8 2.2.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.5-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.8.8 2.1 1 .3.1.5.2.6.3.1.2.1.9-.1 1.5Z"
                    />
                  </svg>
                  Viber
                </a>
                <a className="contact-chip reveal" href={`mailto:${EMAIL}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 5-8-5V6l8 5 8-5v2.2Z"
                    />
                  </svg>
                {EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>© {new Date().getFullYear()} БарСайтов · сайты на заказ</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Site />
      {import.meta.env.DEV && (
        <Agentation endpoint="http://localhost:4747" />
      )}
    </>
  );
}
