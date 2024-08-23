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
            Кількість в наборі
          </AccordionSummary>
          <AccordionDetails>
            Normally, 3 colors are absolutely fine (meaning background, text, and one accent color).
            However, if you want, you can have more. Usually, we don’t add more than 6 colors across
            a platform. It would just make things too... complicated. Plus, it makes it hard to keep
            the colors consistent throughout the design.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Кількість в наборі
          </AccordionSummary>
          <AccordionDetails>
            Normally, 3 colors are absolutely fine (meaning background, text, and one accent color).
            However, if you want, you can have more. Usually, we don’t add more than 6 colors across
            a platform. It would just make things too... complicated. Plus, it makes it hard to keep
            the colors consistent throughout the design.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Кількість в наборі
          </AccordionSummary>
          <AccordionDetails>
            Normally, 3 colors are absolutely fine (meaning background, text, and one accent color).
            However, if you want, you can have more. Usually, we don’t add more than 6 colors across
            a platform. It would just make things too... complicated. Plus, it makes it hard to keep
            the colors consistent throughout the design.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Кількість в наборі
          </AccordionSummary>
          <AccordionDetails>
            Normally, 3 colors are absolutely fine (meaning background, text, and one accent color).
            However, if you want, you can have more. Usually, we don’t add more than 6 colors across
            a platform. It would just make things too... complicated. Plus, it makes it hard to keep
            the colors consistent throughout the design.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<AddOutlinedIcon sx={{ fontSize: 40 }} />}>
            Кількість в наборі
          </AccordionSummary>
          <AccordionDetails>
            Normally, 3 colors are absolutely fine (meaning background, text, and one accent color).
            However, if you want, you can have more. Usually, we don’t add more than 6 colors across
            a platform. It would just make things too... complicated. Plus, it makes it hard to keep
            the colors consistent throughout the design.
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};
