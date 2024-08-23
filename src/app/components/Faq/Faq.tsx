import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import "./Faq.scss";

export const Faq: React.FC = () => {
  return (
    <section className="faq">
      <div className="faq__left">
        <h2 className="faq__title">FAQ</h2>
        <p className="faq__subtitle">Відповіді на деякі питання, які у вас можуть виникнути.</p>
      </div>
      <div className="faq__right">
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Як швидко здійснюється доставка?
          </AccordionSummary>
          <AccordionDetails>
            Доставка Новою поштою становить в середньому 1-3 робочі дні з моменту відправки.
            <br />
            Доставка Укрпоштою до 10 днів. <br /> <br /> Більше інфромації за{" "}
            <span>посиланням</span>.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Чи можу я скасувати замовлення після його оформлення?
          </AccordionSummary>
          <AccordionDetails>
            Повернення та обмін товарів належної якості згідно Закону «Про захист прав споживачів»
            можливий протягом 14 днів після отримання товару покупцем. Зворотня доставка товарів
            здійснюється за домовленістю. Обмін та повернення товарів здійснюється поштовою
            компанією "Нова пошта".
            <br /> <br />
            Більше інфромації за <span>посиланням</span>.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Які засоби оплати ви приймаєте?
          </AccordionSummary>
          <AccordionDetails>
            1. При отриманні посилки на "Новій Пошті", а також " Укрпошти".
            <br />
            2. Грошовий переказ на розрахунковий рахунок.
            <br /> <br />
            Більше інфромації за <span>посиланням</span>.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Які умови повернення товарів неналежної якості?
          </AccordionSummary>
          <AccordionDetails>
            Згідно статті 8 Закону України «Про захист прав споживачів» у разі виявлення протягом
            встановленого гарантійного строку недоліків споживач, в порядку та в строки, встановлені
            законодавством, має право вимагати: <br />- пропорційного зменшення ціни; <br />-
            безоплатного усунення недоліків товару; <br />- відшкодування витрат на усунення
            недоліків товару. <br />- при виявлені недоліків товару які не підлягають ремонту,
            Клієнт може запросити заміну товару або ж повернення коштів Інформування про отримання
            товару неналежної якості повинно бути виконано в перші 24 години після отримання товару
            Клієнтом телефонним дзвінком, повідомленням на електронну пошту office@suvenir.com.ua,
            або в мессенджері Viber по номеру телефону +380675350585.
            <br /> <br />
            Більше інфромації за <span>посиланням</span>.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            У чому різниця між "Є в наявності" та "Під замовлення"?
          </AccordionSummary>
          <AccordionDetails>
            "Є в наявності" означає, що товару є на складі і у випадку покупки буде відразу ж
            відправлено, а "Під замовлення" означає, що його немає на складі і у випадку покупки цей
            товар буде доставлятися трохи довше.
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};
