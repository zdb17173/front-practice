package org.fran.front.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author fran
 * @Description
 *      配合前端Server-Sent Events的demo。一个链接需要使用while(true)保持连接，以保证数据连续不断的传输。
 *      使用http协议，只能传输文本。协议简单，包括retry：重试间隔、event：事件名、data：传输数据 三部分
 * @Date 2021/7/28 11:30
 */
@RestController
@RequestMapping("/api/sse")
public class TestServerSentEventController {

    @RequestMapping(value="/get", method = RequestMethod.GET)
    public void get(HttpServletResponse httpResponse){

        httpResponse.setContentType("text/event-stream");
        httpResponse.setHeader("Cache-Control", "no-cache");
        httpResponse.setHeader("Connection", "keep-alive");
//        httpResponse.setHeader("Access-Control-Allow-Origin", "*");

        try {
            ServletOutputStream stream = httpResponse.getOutputStream();
            //重试间隔，毫秒
            stream.write("retry: 10000\n".getBytes("UTF-8"));
            //多个字段间，以\n为换行
            stream.write("event: message\n".getBytes("UTF-8"));
            while(true) {
                //协议以\n\n为结束
                stream.write("data: some text\n\n".getBytes("UTF-8"));
                stream.flush();
                System.out.println("发送消息");
                try {
                    Thread.sleep(15 * 1000l);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
