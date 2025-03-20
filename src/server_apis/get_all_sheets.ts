export const getAllSheets = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/sheets`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            },
        });
    
        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false, error: 'পরীক্ষার তালিকা লোড করতে সমস্যা হয়েছে' };
    }
};