import axiosInstance from '../utils/axios/axios';

const GetHostChallenge = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('scp03/hostChallenge');
    return response.data.hostChallenge;
  } catch (error) {
    console.error('Error fetching host challenge:', error);
    throw error;
  }
};

const InitHostScp03 = async (init: string): Promise<void> => {
  try {
    await axiosInstance.post('scp03/initHostSCP03', {
      cardParam: init,
    });
    return;
  } catch (error) {
    throw error;
  }
};

const GetHostCryptogram = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('scp03/hostCryptogram');
    return response.data.hostCryptogram;
  } catch (error) {
    throw error;
  }
};

const GenerateCMAC = async (command: string, data: string): Promise<string> => {
  try {
    const response = await axiosInstance.post('scp03/generateCMAC', {
      command,
      data,
    });
    return response.data.generateCMAC;
  } catch (error) {
    throw error;
  }
};

const ChannelFinish = async (authResponse: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('scp03/channelFinish', {
      authResponse,
    });
    return response.data.isAuth;
  } catch (error) {
    throw error;
  }
};

const Wrap = async (command?: string, data?: string) => {
  try {
    const response = await axiosInstance.post('scp03/wrap', {command, data});
    return response.data.wrap;
  } catch (error) {
    throw error;
  }
};

const Unwrap = async (data?: string) => {
  try {
    const response = await axiosInstance.post('scp03/unwrap', {data});
    return response.data.unwrap;
  } catch (error) {
    throw error;
  }
};

export default {
  GetHostChallenge,
  InitHostScp03,
  GetHostCryptogram,
  GenerateCMAC,
  ChannelFinish,
  Wrap,
  Unwrap,
};
