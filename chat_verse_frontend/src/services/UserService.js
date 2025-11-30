import { httpClient } from "../config/AxiosHelper";

export const saveUser = async (formData) => {
    console.log("form data : " +  formData);
    try {
        const response = await httpClient.post('/saveUser', formData)
        console.log("Response :- " + response)
        console.log("Response :- " + response.status)
        console.log("Response Data :- " + response.data)
        return response;
    } catch (error) {
        console.error("Error saving user:", error);
        throw error;
    }
};

export const userLogin = async (formData) => {
    console.log("form data : " +  formData);
    console.log("7")
    try {
        const response = await httpClient.post('/login', formData)
        console.log("Response :- " + response)
        console.log("8")
        return response;
    } catch (error) {
        console.log("9")
        console.error("Error saving user:", error);
        throw error;
    }
};

// Function to encode credentials for HTTP Basic
const encodeCredentials = (phoneNumber, password) => {
    const credentials = `${phoneNumber}:${password}`;
    return btoa(credentials); // btoa() is a built-in function to Base64 encode a string
};


export const getUser = async (phoneNumber) => {
    // const token = localStorage.getItem("token");
    try {
        const response = await httpClient.get(`/profile/${phoneNumber}`);
        return response.data;
    }catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const changePassword = async (userData) => {
    try{
        console.log("User Data" + userData)
        const response = await httpClient.post('/profile/changePassword', userData);
        console.log(response)
        console.log(response.data)
        return response;
    }catch (error){
        console.log("Something gives error");
        throw error;
    }
}

export const getUserChatRooms = async (phoneNumber, password) => {
    console.log("2");
    console.log("Phone Number in UserService : " + phoneNumber)
    console.log("Password in UserService : " + password)
    // Encode the credentials
    const encoded = encodeCredentials(phoneNumber, password);

    try {
        const response = await httpClient.get(`/user/rooms/${phoneNumber}`, {
            headers: {
                // Send the Authorization header with the encoded credentials
                'Authorization': `Basic ${encoded}`,
            },
            withCredentials: true
        });
        console.log("3");
        console.log( "Response Data (UserService) : ", response.data);
        return response.data;
    } catch (error) {
        console.log("4");
        console.error("Error fetching chat rooms:", error);
        throw error;
    }
};


export const searchUserByPhoneNumber = async (phoneNumber) => {
    try {
        // Try to use stored credentials if available (Basic Auth)
        const currentPhone = localStorage.getItem('phoneNumber');
        const password = localStorage.getItem('password');
        const config = {};
        if (currentPhone && password) {
            const encoded = encodeCredentials(currentPhone, password);
            config.headers = {
                'Authorization': `Basic ${encoded}`
            };
            config.withCredentials = true;
        }

        const response = await httpClient.get(`/user/search/${phoneNumber}`, config);
        return response.data;
    } catch (error) {
        console.error("Error searching user:", error);
        throw error;
    }
};

export const createChatRoom = async (currentPhoneNumber, otherPhoneNumber, password) => {
    const encoded = encodeCredentials(currentPhoneNumber, password);
    try {
        const response = await httpClient.post(
            `/user/rooms/create`,
            {
                participant1PhoneNumber: currentPhoneNumber,
                participant2PhoneNumber: otherPhoneNumber
            },
            {
                headers: {
                    'Authorization': `Basic ${encoded}`
                },
                withCredentials: true
            }
        );
        console.log("Chat room created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating chat room:", error);
        throw error;
    }
};

// export async function getUserIdByPhoneNumber(phoneNumber) {
//     const res = await httpClient.get(`/user/by-phone/${encodeURIComponent(phoneNumber)}`);
//     // Axios returns data directly, no .ok or .json()
//     if (!res.data || !res.data.id) throw new Error("User not found");
//     return res.data.id;
// }


export const getMessages = async (roomId, size=50, page=0) => {
    const currentPhone = localStorage.getItem('phoneNumber');
    const password = localStorage.getItem('password');
    const config = {};
    if (currentPhone && password) {
        const encoded = encodeCredentials(currentPhone, password);
        config.headers = {
            'Authorization': `Basic ${encoded}`
        };
        config.withCredentials = true;
    }

    const response = await httpClient.get(`/user/room/${roomId}/messages?size=${size}&page=${page}`, config);
    return response.data; 
}

export const sendChatMessage = async (chatMessage) => {
    try {
        // Try using stored credentials first (for protected endpoints)
        const currentPhone = localStorage.getItem('phoneNumber');
        const password = localStorage.getItem('password');
        const config = {};
        if (currentPhone && password) {
            const encoded = encodeCredentials(currentPhone, password);
            config.headers = { 'Authorization': `Basic ${encoded}` };
            config.withCredentials = true;
        }

        // Attempt HTTP POST to backend REST endpoint (if implemented)
        const response = await httpClient.post('/chat/send', chatMessage, config);
        return response.data;
    } catch (error) {
        console.error('Error sending chat message via REST:', error);
        // Re-throw so caller can decide fallback (e.g., send via STOMP/websocket)
        throw error;
    }
}

