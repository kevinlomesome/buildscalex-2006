export const WHATSAPP_NUMBER = "917990359221";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const DEFAULT_WHATSAPP_MSG = "Hi Build Scale X, I'm interested in your services and would like to discuss my project.";
export const getWhatsAppLink = (message: string = DEFAULT_WHATSAPP_MSG) => {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
};

export const socialLinks = {
  linkedin: "https://linkedin.com/company/buildscalex",
  instagram: "https://instagram.com/buildscalex",
  facebook: "https://facebook.com/buildscalex",
};

