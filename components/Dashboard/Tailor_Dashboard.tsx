// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";

import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const App: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState<number>(1);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "tailor",
      message: "Hello! How can I help you today?",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "user",
      message: "Hi, I need to discuss some alterations for my suit.",
      time: "10:02 AM",
    },
    {
      id: 3,
      sender: "tailor",
      message:
        "Of course! Could you please provide more details about the alterations you need?",
      time: "10:03 AM",
    },
    {
      id: 4,
      sender: "user",
      message:
        "The sleeves are a bit long and I would like to have the waist taken in slightly.",
      time: "10:05 AM",
    },
  ]);
  const revenueChartRef = useRef<HTMLDivElement>(null);
  const orderTypeChartRef = useRef<HTMLDivElement>(null);
  const notifications = [
    "New order received from Emily Thompson",
    "Measurement update from Michael Chen",
    "Order #2458 is due tomorrow",
    "Customer feedback received for Order #2445",
  ];
  const orders = [
    {
      id: "#2458",
      customer: "Emily Thompson",
      type: "Evening Dress",
      dueDate: "2025-03-05",
      status: "In Progress",
    },
    {
      id: "#2457",
      customer: "Michael Chen",
      type: "Business Suit",
      dueDate: "2025-03-10",
      status: "New",
    },
    {
      id: "#2456",
      customer: "Sarah Williams",
      type: "Wedding Dress",
      dueDate: "2025-03-15",
      status: "Ready",
    },
    {
      id: "#2455",
      customer: "James Anderson",
      type: "Tuxedo",
      dueDate: "2025-03-12",
      status: "In Progress",
    },
    {
      id: "#2454",
      customer: "Isabella Martinez",
      type: "Cocktail Dress",
      dueDate: "2025-03-08",
      status: "New",
    },
  ];
  const customers = [
    {
      id: "1",
      name: "Emily Thompson",
      email: "emily.t@email.com",
      orders: 5,
      lastOrder: "2025-02-20",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@email.com",
      orders: 3,
      lastOrder: "2025-02-15",
    },
    {
      id: "3",
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      orders: 7,
      lastOrder: "2025-02-22",
    },
    {
      id: "4",
      name: "James Anderson",
      email: "james.a@email.com",
      orders: 4,
      lastOrder: "2025-02-18",
    },
    {
      id: "5",
      name: "Isabella Martinez",
      email: "isabella.m@email.com",
      orders: 6,
      lastOrder: "2025-02-25",
    },
  ];
  const appointments = [
    {
      id: "1",
      customer: "Emily Thompson",
      date: "2025-02-27",
      time: "10:00 AM",
      type: "Fitting",
    },
    {
      id: "2",
      customer: "Michael Chen",
      date: "2025-02-27",
      time: "2:00 PM",
      type: "Measurement",
    },
    {
      id: "3",
      customer: "Sarah Williams",
      date: "2025-02-28",
      time: "11:30 AM",
      type: "Consultation",
    },
    {
      id: "4",
      customer: "James Anderson",
      date: "2025-02-28",
      time: "3:30 PM",
      type: "Fitting",
    },
    {
      id: "5",
      customer: "Isabella Martinez",
      date: "2025-02-29",
      time: "1:00 PM",
      type: "Measurement",
    },
  ];
  const messages = [
    {
      id: "1",
      from: "Emily Thompson",
      subject: "Dress Alterations",
      time: "09:30 AM",
      unread: true,
    },
    {
      id: "2",
      from: "Michael Chen",
      subject: "Suit Fitting Schedule",
      time: "10:15 AM",
      unread: false,
    },
    {
      id: "3",
      from: "Sarah Williams",
      subject: "Wedding Dress Details",
      time: "Yesterday",
      unread: true,
    },
    {
      id: "4",
      from: "James Anderson",
      subject: "Tuxedo Questions",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "5",
      from: "Isabella Martinez",
      subject: "Appointment Confirmation",
      time: "2 days ago",
      unread: false,
    },
  ];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (revenueChartRef.current && activeTab === "dashboard") {
      const chart = echarts.init(revenueChartRef.current);
      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            color: isDarkMode ? '#e5e7eb' : '#374151'
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: isDarkMode ? '#e5e7eb' : '#374151'
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            color: "#6366f1",
          },
        ],
        textStyle: {
          color: isDarkMode ? '#e5e7eb' : '#374151'
        }
      };
      chart.setOption(option);
    }

    if (orderTypeChartRef.current && activeTab === "dashboard") {
      const chart = echarts.init(orderTypeChartRef.current);
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: isDarkMode ? '#e5e7eb' : '#374151'
          }
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            data: [
              { value: 35, name: "Dresses" },
              { value: 25, name: "Suits" },
              { value: 20, name: "Shirts" },
              { value: 15, name: "Pants" },
              { value: 5, name: "Others" },
            ],
            label: {
              color: isDarkMode ? '#e5e7eb' : '#374151'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart.setOption(option);
    }
  }, [activeTab, isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div
                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow p-6`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} text-sm font-medium`}
                  >
                    Pending Orders
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    +12%
                  </span>
                </div>
                <p
                  className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mt-2`}
                >
                  24
                </p>
              </div>
              <div
                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow p-6`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} text-sm font-medium`}
                  >
                    Completed Orders
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    +8%
                  </span>
                </div>
                <p
                  className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mt-2`}
                >
                  156
                </p>
              </div>
              <div
                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow p-6`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} text-sm font-medium`}
                  >
                    Revenue
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    +15%
                  </span>
                </div>
                <p
                  className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mt-2`}
                >
                  $12,845
                </p>
              </div>
              <div
                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow p-6`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} text-sm font-medium`}
                  >
                    Active Customers
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    +5%
                  </span>
                </div>
                <p
                  className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mt-2`}
                >
                  89
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div
                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow p-6`}
              >
                <h3
                  className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}
                >
                  Revenue Trend
                </h3>
                <div ref={revenueChartRef} style={{ height: "300px" }}></div>
              </div>
              <div
                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow p-6`}
              >
                <h3
                  className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}
                >
                  Order Types
                </h3>
                <div ref={orderTypeChartRef} style={{ height: "300px" }}></div>
              </div>
            </div>
            <div
              className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow`}
            >
              <div className="p-6 border-b border-gray-200">
                <h3
                  className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Recent Orders
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Order ID
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Customer
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Type
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Due Date
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${isDarkMode ? "bg-gray-800" : "bg-white"} divide-y divide-gray-200`}
                  >
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className={
                          isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }
                      >
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {order.id}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {order.customer}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {order.type}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {order.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "New"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "In Progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="!rounded-button text-indigo-600 hover:text-indigo-900 mr-2">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="!rounded-button text-indigo-600 hover:text-indigo-900 mr-2">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="!rounded-button text-indigo-600 hover:text-indigo-900">
                            <i className="fas fa-comment"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case "customers":
        return (
          <div
            className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow`}
          >
            <div className="p-6 border-b border-gray-200">
              <h3
                className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Customers
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Name
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Email
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Total Orders
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Last Order
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${isDarkMode ? "bg-gray-800" : "bg-white"} divide-y divide-gray-200`}
                >
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className={
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }
                    >
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {customer.name}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {customer.email}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {customer.orders}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {customer.lastOrder}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="!rounded-button text-indigo-600 hover:text-indigo-900 mr-2">
                          <i className="fas fa-user-edit"></i>
                        </button>
                        <button className="!rounded-button text-indigo-600 hover:text-indigo-900">
                          <i className="fas fa-history"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "appointments":
        return (
          <div
            className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow`}
          >
            <div className="p-6 border-b border-gray-200">
              <h3
                className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Appointments
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Customer
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Date
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Time
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Type
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${isDarkMode ? "bg-gray-800" : "bg-white"} divide-y divide-gray-200`}
                >
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className={
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }
                    >
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {appointment.customer}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {appointment.date}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {appointment.time}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {appointment.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="!rounded-button text-indigo-600 hover:text-indigo-900 mr-2">
                          <i className="fas fa-calendar-alt"></i>
                        </button>
                        <button className="!rounded-button text-indigo-600 hover:text-indigo-900">
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "messages":
        return (
          <div
            className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow`}
          >
            <div className="p-6 border-b border-gray-200">
              <h3
                className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Messages
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${message.unread ? "bg-indigo-600" : "bg-gray-300"}`}
                      ></div>
                      <span
                        className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {message.from}
                      </span>
                    </div>
                    <span
                      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {message.time}
                    </span>
                  </div>
                  <p
                    className={`mt-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {message.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "chat":
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm h-[600px] flex flex-col`}>
            {/* Chat Header */}
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Chat</h2>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'tailor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'tailor'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p>{message.message}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t dark:border-gray-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!messageInput.trim()) return;
                  
                  setChatMessages([
                    ...chatMessages,
                    {
                      id: chatMessages.length + 1,
                      sender: 'tailor',
                      message: messageInput,
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);
                  setMessageInput('');
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Prevent hydration issues
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-sm">
          {/* Removed Theme Toggle Button */}
          <nav className="mt-8 px-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`!rounded-button flex items-center space-x-2 w-full px-4 py-2 text-sm font-medium ${
                activeTab === "dashboard"
                  ? `${isDarkMode ? "bg-gray-700 text-white" : "bg-indigo-50 text-indigo-600"}`
                  : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"}`
              }`}
            >
              <i className="fas fa-chart-line w-5"></i>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`!rounded-button flex items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-medium ${
                activeTab === "orders"
                  ? `${isDarkMode ? "bg-gray-700 text-white" : "bg-indigo-50 text-indigo-600"}`
                  : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"}`
              }`}
            >
              <i className="fas fa-shopping-bag w-5"></i>
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`!rounded-button flex items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-medium ${
                activeTab === "customers"
                  ? `${isDarkMode ? "bg-gray-700 text-white" : "bg-indigo-50 text-indigo-600"}`
                  : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"}`
              }`}
            >
              <i className="fas fa-users w-5"></i>
              <span>Customers</span>
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`!rounded-button flex items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-medium ${
                activeTab === "appointments"
                  ? `${isDarkMode ? "bg-gray-700 text-white" : "bg-indigo-50 text-indigo-600"}`
                  : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"}`
              }`}
            >
              <i className="fas fa-calendar-alt w-5"></i>
              <span>Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`!rounded-button flex items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-medium ${
                activeTab === "messages"
                  ? `${isDarkMode ? "bg-gray-700 text-white" : "bg-indigo-50 text-indigo-600"}`
                  : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"}`
              }`}
            >
              <i className="fas fa-envelope w-5"></i>
              <span>Messages</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`!rounded-button flex items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-medium ${
                activeTab === "chat"
                  ? `${isDarkMode ? "bg-gray-700 text-white" : "bg-indigo-50 text-indigo-600"}`
                  : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"}`
              }`}
            >
              <i className="fas fa-comments w-5"></i>
              <span>Chat</span>
            </button>
          </nav>
        </div>
        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              className={`absolute right-4 mt-2 w-80 ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg py-1 z-10`}
            >
              <div className="px-4 py-2 border-b border-gray-200">
                <h3
                  className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Notifications
                </h3>
              </div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                >
                  <p
                    className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {notification}
                  </p>
                </div>
              ))}
              <div className="px-4 py-2 border-t border-gray-200">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View all notifications
                </a>
              </div>
            </div>
          )}
          {/* Main Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
