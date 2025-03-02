'use client';

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import * as echarts from "echarts";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useTheme } from "next-themes";
import { FaUser, FaTimes, FaShoppingBag } from 'react-icons/fa';

const CustomerProfile: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
  });

  const [measurements, setMeasurements] = useState({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hip: "",
    shoulder: "",
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Italian Leather Oxford Shoes",
      image: "https://public.readdy.ai/ai/img_res/452788704605d0e68738c9d6a4d968f4.jpg",
      size: "US 10",
      price: 299.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Cashmere Wool Sweater",
      image: "https://public.readdy.ai/ai/img_res/50549789f91e04a8303831eee5461a8c.jpg",
      size: "L",
      price: 245.00,
      quantity: 2,
    },
    {
      id: 3,
      name: "Tailored Wool Trousers",
      image: "https://public.readdy.ai/ai/img_res/2cbe2138f4dad7957e5952a4ac47371a.jpg",
      size: "XL",
      price: 185.00,
      quantity: 1,
    },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          router.push('/login');
          return;
        }

        const parsedUser = JSON.parse(userData);
        
        if (parsedUser.userType !== 'customer') {
          router.push('/login');
          return;
        }

        setUser(parsedUser);
        
        setProfileData({
          fullName: `${parsedUser.firstName} ${parsedUser.lastName}`,
          email: parsedUser.email,
          phone: parsedUser.profile?.phone || "",
          dob: parsedUser.profile?.dob || "",
          address: parsedUser.profile?.address || "",
        });

        if (parsedUser.measurements) {
          setMeasurements(parsedUser.measurements);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((total, item) => total + item.quantity, 0));

    const initChart = () => {
      const chartDom = document.getElementById("sizeChart");
      if (!chartDom) return;
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          backgroundColor: isDarkMode ? '#374151' : '#ffffff',
          borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
          textStyle: {
            color: isDarkMode ? '#E5E7EB' : '#111827'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          axisLine: {
            lineStyle: {
              color: isDarkMode ? '#4B5563' : '#9CA3AF'
            }
          },
          axisLabel: {
            color: isDarkMode ? '#E5E7EB' : '#4B5563'
          }
        },
        yAxis: {
          type: "value",
          name: "cm",
          nameTextStyle: {
            color: isDarkMode ? '#E5E7EB' : '#4B5563'
          },
          axisLine: {
            lineStyle: {
              color: isDarkMode ? '#4B5563' : '#9CA3AF'
            }
          },
          axisLabel: {
            color: isDarkMode ? '#E5E7EB' : '#4B5563'
          },
          splitLine: {
            lineStyle: {
              color: isDarkMode ? '#374151' : '#E5E7EB'
            }
          }
        },
        series: [
          {
            name: "Waist",
            type: "line",
            data: [73, 72, 71.5, 71, 71, 71],
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 4
            }
          },
        ],
        color: isDarkMode ? ["#60A5FA"] : ["#2563EB"],
      };
      myChart.setOption(option);
    };
    initChart();
  }, [isDarkMode, cartItems]);

  const handleSave = async () => {
    try {
      // TODO: Implement profile update API
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Header onCartClick={handleCartClick} cartItemsCount={cartItemsCount} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <FaUser className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
            <p className="text-blue-600 dark:text-blue-400">Premium Member</p>
          </div>
        </div>

        {/* Profile Information and Size Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(profileData).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4">
                  <label className="capitalize text-gray-600 dark:text-gray-400">{key.replace(/([A-Z])/g, " $1").trim()}</label>
                  {isEditing ? (
                    <input
                      type={key === "dob" ? "date" : "text"}
                      value={value}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          [key]: e.target.value,
                        })
                      }
                      className="col-span-2 px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                  ) : (
                    <span className="col-span-2">{value}</span>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="rounded-full px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Size Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(measurements).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <label className="capitalize text-gray-600 dark:text-gray-400">{key}</label>
                  <span className="font-medium">{value} {key === "weight" ? "kg" : "cm"}</span>
                </div>
              ))}
            </div>
            <div id="sizeChart" className="w-full h-64"></div>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg mt-8">
          <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="aspect-w-1 aspect-h-1 w-full mb-4">
                  <img src={item.image} alt={item.name} className="object-cover rounded-lg" />
                </div>
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Cart Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${showCart ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 right-0 max-w-xl w-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FaShoppingBag className="text-blue-600 dark:text-blue-400" />
                Shopping Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Size: {item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-semibold text-blue-600 dark:text-blue-400">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">-</button>
                        <span>{item.quantity}</span>
                        <button className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Total</span>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
              <button className="w-full py-3 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerProfile;
