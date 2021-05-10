package org.fran.front.backend.controller;

import org.fran.front.backend.vo.JsonResult;
import org.fran.front.backend.vo.RemoveConfigParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;


@RestController
@RequestMapping("/api/test")
public class TestRestController {
	static Logger log = LoggerFactory.getLogger(TestRestController.class);

	@PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public JsonResult<String> postTest(
			@RequestBody Map<String, Object> vo
	){

		System.out.println(vo);
		JsonResult<String> res = new JsonResult<>();
		res.setData("dsadsad");
		res.setDescription("sahdjhsajdhjsahdjsajdjh");
		res.setStatus(200);
		return res;
	}

	@GetMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.ALL_VALUE)
	public JsonResult getTest(@RequestParam String id){

		JsonResult res = new JsonResult<>();

		Map<String, Object> data = new HashMap<>();
		data.put("a", "aaaaa");
		data.put("b", new String[]{"11", "22", "33", "44"});
		data.put("date", "2021-05-06 10:08:32");
		data.put("cailiaoRadio", "铝合金");
		data.put("cailiaoOther", "blabla");

		List<Map<String, Object>> dynData = new ArrayList<>();

		Map<String, Object> d1 = new HashMap<>();
		d1.put("title0", "dsadsa111");
		d1.put("ddd0", "dsadsadad111");
		dynData.add(d1);
		Map<String, Object> d2 = new HashMap<>();
		d2.put("title1", "dsadsa222");
		d2.put("ddd1", "dsadsadad222");
		dynData.add(d2);
		data.put("dynData", dynData);

		res.setData(data);
		res.setDescription("sahdjhsajdhjsahdjsajdjh");
		res.setStatus(200);
		return res;
	}

	//后端图片上传
	@PostMapping(value = "/upload",
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public JsonResult upload(
			@RequestPart("uploadFile")MultipartFile uploadFile,
			@RequestPart("description")String description,
			@RequestPart("name")String name){
		FileOutputStream o = null;
		InputStream inputStream = null;
		try {
			inputStream = uploadFile.getInputStream();
			File f = new File("C:\\temp\\" + name);
			o = new FileOutputStream(f);
			byte[] b = new byte[1024];
			int i = 0;
			while((i = inputStream.read(b))!= -1){
				o.write(b, 0, i);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			try {
				if(o!= null)
					o.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				if(inputStream!= null)
					inputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		JsonResult res = new JsonResult();
		res.setData(name);
		res.setDescription("success");
		res.setStatus(200);
		return res;
	}

	//后端图片预览
	@RequestMapping(value="/download", method = RequestMethod.GET)
	public void download(
			HttpServletResponse httpResponse,
			@RequestParam(name="fileName") String fileName
	){
		File sourceFile = new File("C:\\temp\\" + fileName);
		httpResponse.setContentLengthLong(sourceFile.length());
		httpResponse.setContentType("image/jpg");
		httpResponse.setStatus(HttpServletResponse.SC_OK);

		httpResponse.setHeader("Content-disposition","attachment;filename=" + sourceFile.getName());

		try(FileInputStream in = new FileInputStream(sourceFile);
			ServletOutputStream out = httpResponse.getOutputStream();
		){
			byte[] b = new byte[1024];
			while(in.read(b)!= -1){
				out.write(b);
			}
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@CrossOrigin("http://127.0.0.1:8080")
	@GetMapping(value = "/checkLogin", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.ALL_VALUE)
	public JsonResult<String> checkLogin(){

	    //从session中获取全局用户信息 scope 1为session
		Object user = RequestContextHolder.getRequestAttributes().getAttribute("user", 1);

		JsonResult<String> res = new JsonResult<>();
		res.setDescription("sahdjhsajdhjsahdjsajdjh");
		res.setStatus(200);
		return res;
	}


	@PostMapping(value = "/selectString", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public JsonResult<String> firstTest(@RequestBody RemoveConfigParam baseParam){
		log.info("firstTest");
		JsonResult<String> res = new JsonResult<>();
		res.setData("dsadsad");
		res.setDescription("sahdjhsajdhjsahdjsajdjh");
		res.setStatus(200);
		return res;
	}

	@GetMapping(value = "/selectList", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.ALL_VALUE)
	public JsonResult<List<String>> selectTest(@RequestParam(name="id") int ids){
		log.info("selectAll ids:["+ ids +"]");
		if(ids == 5)
			throw new RuntimeException("error!!!!");

		JsonResult<List<String>> res = new JsonResult<>();
		res.setData(new ArrayList<String>(){
			{
				add("sadsda1");
				add("sadsda2");
				add("sadsda3");
				add("sadsda4");
				add("sadsda5");
			}
		});
		res.setDescription("sahdjhsajdhjsahdjsajdjh");
		res.setStatus(200);
		return res;
	}


}
