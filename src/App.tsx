import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

const services = [
  {
    title: "Лендинг под заявки",
    price: "от 350 BYN",
    type: "landing",
    text: "Одна страница с сильным оффером, информационные блоки, форма обратной связи, навигация, требования законодательства. Срок: 1-7 дней.",
  },
  {
    title: "Корпоративный сайт",
    price: "от 900 BYN",
    type: "corp",
    text: "Многостраничный сайт, услуги, легкие интеграции, админ-панель (опционально). Срок: 7-14 дней.",
  },
  {
    title: "Интернет-магазин",
    price: "от 1500 BYN",
    type: "shop",
    text: "Каталог, админ-панель, корзина, оплата (опционально), аналитика и т. д. Срок: до 30 дней.",
  },
  {
    title: "Редизайн / доработка",
    price: "от 250 BYN",
    type: "other",
    text: "Обновление визуала, оптимизация скорости и дизайна текущего сайта без полной перестройки.",
  },
  {
    title: "Сопровождение",
    price: "от 120 BYN",
    type: "other",
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

function Site() {
  const rootRef = useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [taskType, setTaskType] = useState("landing");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div ref={rootRef}>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container site-header__inner">
          <a className="brand" href="#top">
            <span className="brand__mark" aria-hidden="true" />
            БарСайтов
          </a>
          <nav className="nav" aria-label="Основная навигация">
            <a href="#services">Услуги</a>
            <a href="#process">Процесс</a>
            <a href="#cases">Кейсы</a>
            <a href="#contact">Контакты</a>
          </nav>
          <a className="btn btn--primary" href="#contact">
            Обсудить проект
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__brand">
                Бар<span>Сайтов</span>
              </p>
              <h1 className="hero__title">Сайты на заказ</h1>
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
        </section>

        <section className="section section--tight" id="services">
          <div className="container">
            <div className="section__head reveal">
              <h2 className="section__title">Услуги</h2>
              <p className="section__text">
                Короткий набор направлений — без прайса на 20 строк. Цены
                ориентировочные, финал после брифа.
              </p>
            </div>
            <div className="services">
              {services.map((item) => (
                <a
                  className="service reveal"
                  key={item.title}
                  href="#contact"
                  onClick={() => setTaskType(item.type)}
                >
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

        <section className="section" id="process">
          <div className="container">
            <div className="section__head reveal">
              <p className="section__eyebrow">Как работаем</p>
              <h2 className="section__title">Дорожная карта создания сайта</h2>
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

        <section className="section" id="cases">
          <div className="container">
            <div className="section__head reveal">
              <h2 className="section__title">Работаю с задачами бизнеса</h2>
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

        <section className="section" id="faq">
          <div className="container">
            <div className="section__head reveal">
              <p className="section__eyebrow">FAQ</p>
              <h2 className="section__title">Частые вопросы</h2>
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

        <section className="section" id="contact">
          <div className="container contact">
            <div>
              <div className="section__head reveal">
                <p className="section__eyebrow">Контакт</p>
                <h2 className="section__title">Обсудим ваш проект</h2>
                <p className="section__text">
                  Оставьте заявку — ответим в течение рабочего дня.
                </p>
              </div>
              <form className="contact__form reveal" onSubmit={onSubmit}>
                <div className="field">
                  <label htmlFor="name">Имя</label>
                  <input id="name" name="name" required placeholder="Как к вам обращаться" />
                </div>
                <div className="field">
                  <label htmlFor="contact">Telegram / телефон</label>
                  <input
                    id="contact"
                    name="contact"
                    required
                    placeholder="@legat_io или +375..."
                  />
                </div>
                <div className="field">
                  <label htmlFor="type">Тип задачи</label>
                  <select
                    id="type"
                    name="type"
                    value={taskType}
                    onChange={(event) => setTaskType(event.target.value)}
                  >
                    <option value="landing">Лендинг</option>
                    <option value="corp">Корпоративный сайт</option>
                    <option value="shop">Магазин</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">Коротко о задаче</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Ниша, срок, есть ли текущий сайт"
                  />
                </div>
                <button className="btn btn--primary" type="submit">
                  Оставить заявку
                </button>
                <p className={`form-note${sent ? " is-success" : ""}`}>
                  {sent
                    ? "Заявка принята локально (заглушка). Подключите отправку на почту/Telegram позже."
                    : "Нажимая кнопку, вы соглашаетесь на обработку контакта для ответа по заявке."}
                </p>
              </form>
            </div>
            <aside className="contact__aside reveal">
              <p>
                Telegram:{" "}
                <a href="https://t.me/legat_io" target="_blank" rel="noreferrer">
                  @legat_io
                </a>
              </p>
              <p>
                Telegram number:{" "}
                <a href="tel:+375444910602">+375(44)491-06-02</a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:tzavadic@gmail.com">tzavadic@gmail.com</a>
              </p>
              <p>Светлогорск/Беларусь</p>
            </aside>
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
  return <Site />;
}
