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
        console.log(formattedDate)
        return formattedDate !== 'Invalid Date' ? formattedDate : 'Nieznana data';
    } catch (error) {
        console.error('Error parsing date:', error);
        return 'Nieznana data';
    }
};
