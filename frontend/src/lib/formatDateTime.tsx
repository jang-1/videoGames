import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";

export const formatDateTime = (dateTime: string) => {
    try {
        const parsedDate = new Date(dateTime);

        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date');
        }
        
        parsedDate.setHours(parsedDate.getHours() + 2);
        const formattedDate = format(parsedDate, 'dd-MM-yyyy HH:mm', { locale: pl });
        return formattedDate !== 'Invalid Date' ? formattedDate : 'Invalid Date';
    } catch (error) {
        return 'Invalid Date';
    }
};
