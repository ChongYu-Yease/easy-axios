import { AxiosResponse } from 'axios'
import type { AxiosRequestConfigs } from '../index'
/**
 * axios 请求后成功的回调
 */
export type AxiosResponseCallback = <T = any, R = AxiosResponse<T>>(
    axiosResponse: AxiosResponse
) => Promise<R> | Promise<T>

/**
 * axios 请求配置回调
 */
export type AxiosRequestCallback = (
    config: AxiosRequestConfigs
) => AxiosRequestConfigs

/**
 * axios 请求前 请求后的错误回调 的声明
 */
export type AxiosErrorCallback = (error: Error) => Promise<Error>




// axios  防抖
import { AxiosDebounce } from './axios-debounce'

// 创建防抖实例
const axiosDebounceInstance = new AxiosDebounce()


import { Mask } from './create-mask'

// 遮罩层实例
const maskInstance = new Mask()

import { Message } from './create-message'

// 创建message实例
const messageInstance = new Message()

/**
 * 请求前成功回调
 * @param config
 * @returns config
 */
export const axiosRequestCallback: AxiosRequestCallback = (config) => {

    const {
        needLoading,
        loadingText,
        axiosDebounce,
        contentType,
        axiosRequestCallback,
    } = config

    if (axiosRequestCallback && typeof axiosRequestCallback === 'function') {
        axiosRequestCallback(config)
    }

    // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
    if (axiosDebounce) {
        axiosDebounceInstance.handleAxiosDebounce(config)
    }

    // 创建遮罩层
    if (needLoading || loadingText) {
        maskInstance.createLoading(config)
    }

    // 修改content-type
    if (contentType) {
        config.headers = {
            ...config.headers,
            'Content-Type': contentType,
        }
    }

    return config
}

/**
 * 请求前错误回调
 * @param error 错误信息
 * @returns error
 */
export const axiosRequestErrorCallback: AxiosErrorCallback = (error) => {

    return Promise.reject(error)
}

