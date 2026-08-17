import { useEffect, useRef, useState } from "react";
import { Agentation } from "agentation";

const TG_USER = "legat_io";
const TG_MESSAGE = "Привет! Давай обсудим мой проект!";
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
    text: "Специалисты и онлайн-школы: понятная упаковка услуги, доверие и запись на консультацию.",
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
    text: "Арендуем сервер, публикуем сайт, передаем доступы и инструкции по правкам.",
  },
  {
    title: "Гарантия",
    text: "Гарантийная поддержка в течение 2-х недель.",
  },
];

const cases = [
  {
    tag: "Лендинг · услуги",
    title: "Сайт для студии ремонта",
    text: "Задача: больше заявок с рекламы. Решение: короткий оффер, кейсы до/после и форма в 3 поля.",
    result: "Заглушка: +38% заявок",
  },
  {
    tag: "Корпоративный",
    title: "Сайт B2B-поставщика",
    text: "Задача: выглядеть надёжнее конкурентов. Решение: услуги, сертификаты, понятный путь к КП.",
    result: "Заглушка: срок 4 недели",
  },
  {
    tag: "Магазин",
    title: "Каталог для локального бренда",
    text: "Задача: принимать заказы онлайн. Решение: карточки товаров, фильтры и оплата.",
    result: "Заглушка: запуск за 6 недель",
  },
];

const faqs = [
  {
    q: "Сколько времени занимает проект?",
    a: "Лендинг обычно 10–14 дней, корпоративный сайт 3–5 недель. Точный срок зависит от объёма и скорости согласований.",
  },
  {
    q: "Нужны ли тексты и фото от меня?",
    a: "Да, лучше ваши материалы. Если их пока нет — стартуем с заглушек и структуры, затем подменим контент.",
  },
  {
    q: "Сколько правок входит?",
    a: "В пакетах заложены согласованные раунды правок. Мелкие правки после запуска можно оформить в сопровождение.",
  },
  {
    q: "Кто занимается хостингом и доменом?",
    a: "Могу подключить и настроить. Домен и хостинг обычно оплачиваются отдельно на вас.",
  },
  {
    q: "Как проходит оплата?",
    a: "Обычно предоплата 50% на старте и 50% перед запуском. Для крупных проектов — поэтапно.",
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
          <div className="container">
            <h1 className="hero__brand">
              <span className="hero__brand-bar">Бар</span>
              <span className="hero__brand-site">Сайтов</span>
            </h1>
            <div className="hero__grid">
              <div className="hero__copy">
                <p className="hero__title">Сайты на заказ</p>
                <p className="hero__lead">
                  Создаем лендинги, корпоративные сайты и магазины под ключ: от
                  идеи до запуска.
                </p>
                <div className="hero__actions">
                  <a className="btn btn--primary btn--shine" href="#contact">
                    Обсудить проект
                  </a>
                  <a className="btn btn--ghost" href="#cases">
                    Смотреть кейсы
                  </a>
                </div>
              </div>

              <div className="hero__visual" aria-hidden="true">
                <div className="hero__stage">
                  <div className="hero__mock">
                    <div className="hero__mock-bar">
                      <span className="hero__mock-dot" />
                      <span className="hero__mock-dot" />
                      <span className="hero__mock-dot" />
                    </div>
                    <div className="hero__mock-body">
                      <div className="hero__mock-panel" />
                      <div className="hero__mock-panel hero__mock-panel--accent" />
                    </div>
                  </div>
                  <div className="hero__float" />
                </div>
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
                  <div className="case__media">
                    <span className="case__tag">{item.tag}</span>
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="case__meta">
                      <span>{item.result}</span>
                      <span>Скрин: заглушка</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__head reveal" id="faq">
              <h2 className="section__title">
                Частые <span className="section__title-accent">вопросы</span>
              </h2>
              <p className="section__text">
                Коротко про сроки, правки, оплату и то, что нужно от вас.
              </p>
            </div>
            <div className="faq reveal">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section" ref={contactRef}>
          <div className="container contact">
            <div className="section__head reveal" id="contact">
              <p className="section__eyebrow">Контакты</p>
              <h2 className="section__title">
                <span className="section__title-accent">Обсудим</span> ваш проект
              </h2>
              <p className="section__text">
                Напишите в Telegram — ответим в течение рабочего дня.
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

            <div className="contact-links reveal">
              <a className="contact-chip" href={`https://t.me/${TG_USER}`} target="_blank" rel="noreferrer">
                Telegram · @{TG_USER}
              </a>
              <a className="contact-chip" href={`tel:${PHONE}`}>
                {PHONE_LABEL}
              </a>
              <a className="contact-chip" href={`viber://chat?number=%2B${PHONE.replace("+", "")}`}>
                Viber
              </a>
              <a className="contact-chip" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <span className="contact-chip contact-chip--muted">Светлогорск / Беларусь</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>© {new Date().getFullYear()} БарСайтов · сайты на заказ</span>
          <span>Заглушка реквизитов · ИП / самозанятость</span>
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
