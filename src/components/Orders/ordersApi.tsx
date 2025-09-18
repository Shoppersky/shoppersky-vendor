import axiosInstance from '@/lib/axiosInstance';
import useStore from '@/lib/Zustand';

// Mock data based on the API response


export const fetchVendorOrders = async () => {
  console.log("Fetching vendor orders...");
  // In a real application, this would be:
  const userId = useStore.getState().userId;
  const response = await axiosInstance.get(`orders/vendor/orders?vendor_id=${userId}`);
  console.log("Orders fetched:", response.data.data);
  return response.data.data
  
  
};