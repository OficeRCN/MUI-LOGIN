import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionDash() {
    return (
        <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            <Typography>Acciones</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Si no sabe como realizar una acción, comuniquese con soporte o con Don Señor Ingeniero Ken Michael Aguirre Rosado
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            <Typography>Quejas</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            Si no sabe como quejarse, comuniquese con soporte o con Don Señor Ingeniero Ken Michael Aguirre Rosado
            </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    );
}
