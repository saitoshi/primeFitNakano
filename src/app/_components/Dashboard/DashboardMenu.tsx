'use client';
import React, { useEffect, useState } from 'react';
import { BlogTable } from '../BlogRelated/BlogTable';
import { ServiceTable } from '../ServiceRelated/ServiceTable';
import './style.css';
import { useMedia } from 'react-use';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/_utils/assistFunctions/userFunctions';
import { LocationTable } from '../LocationRelated/LocationTable';
export const DashboardMenu = () => {
  interface ITab {
    title: string;
    name: string;
  }
  const tabMenu: ITab[] = [
    {
      title: 'ブログ',
      name: 'blogList',
    },
    {
      title: 'サービス',
      name: 'serviceList',
    },
    {
      title: '店舗',
      name: 'locationList',
    },
    {
      title: '&#x270E; ブログ作成',
      name: 'addBlog',
    },
    {
      title: 'サービス追加',
      name: 'addService',
    },
    {
      title: '新規ユーザー追加',
      name: 'addUser',
    },
  ];
  const [currentTab, setCurrentTab] = useState<string>(tabMenu[0]['name']);
  const [verified, setVerified] = useState<boolean>(false);
  const isDesktop = useMedia('(min-width: 650px)', true);
  function handleClick(value: string) {
    setCurrentTab(value);
  }
  const router = useRouter();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await getToken();
        if (!token) {
          await router.push('/login');
        }
        const tokenResponse = await fetch('api/verify', {
          headers: { Authorization: `Bearer: ${token}` },
          method: 'GET',
        });
        if (tokenResponse.status !== 201) {
          await router.push('/login');
        }
        await setVerified(true);
      } catch (error) {
        console.error(error);
        await router.push('/login');
      }
    };
    if (!verified) {
      verifyToken();
    }
  }, [verified]);
  if (verified) {
    return (
      <>
        {isDesktop ? (
          <div className='tab'>
            <div className='tabMenu'>
              {tabMenu.slice(0, 3).map((menu) => {
                return (
                  <button
                    className='tabButton'
                    key={menu.name}
                    onClick={() => {
                      handleClick(menu.name);
                    }}>
                    {menu.title}
                  </button>
                );
              })}
              <Link href='/create-blog' style={{ textDecoration: 'none' }}>
                <button className='createBlogButton'>
                  &#x270E; ブログ作成
                </button>
              </Link>
              <Link href='/create-service' style={{ textDecoration: 'none' }}>
                <button className='addServiceButton'>
                  &#x271A; サービス追加
                </button>
              </Link>
              <Link href='/create-user' style={{ textDecoration: 'none' }}>
                <button
                  onClick={() => {
                    handleClick('addUser');
                  }}
                  className='addUserButton'>
                  &#x263A; 新規ユーザー追加
                </button>
              </Link>
            </div>
            <div className='tabBody'>
              <div
                className='tabContent'
                style={
                  currentTab == 'blogList'
                    ? { display: 'block' }
                    : { display: 'none' }
                }>
                <BlogTable />
              </div>
              <div
                className='tabContent'
                style={
                  currentTab == 'serviceList'
                    ? { display: 'block' }
                    : { display: 'none' }
                }>
                <ServiceTable />
              </div>
              <div
                className='tabContent'
                style={
                  currentTab == 'locationList'
                    ? { display: 'block' }
                    : { display: 'none' }
                }>
                <LocationTable />
              </div>
            </div>
          </div>
        ) : (
          <div id='mobileTab'>
            <div className='mobileTabHeader'>
              <br />
              {tabMenu.slice(0, 3).map((menu) => {
                return (
                  <button
                    className='tabButton'
                    key={menu.name}
                    onClick={() => {
                      handleClick(menu.name);
                    }}>
                    {menu.title}
                  </button>
                );
              })}
            </div>
            <div
              className='mobileTabBody'
              style={
                currentTab == 'blogList'
                  ? { display: 'block' }
                  : { display: 'none' }
              }>
              <BlogTable />
            </div>
            <div
              className='mobileTabBody'
              style={
                currentTab == 'serviceList'
                  ? { display: 'block' }
                  : { display: 'none' }
              }>
              <ServiceTable />
            </div>
            <div
              className='mobileTabBody'
              style={
                currentTab == 'locationList'
                  ? { display: 'block' }
                  : { display: 'none' }
              }>
              <LocationTable />
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div className='pageSection' id='loadMessage'>
      読み込み中...
    </div>
  );
};
