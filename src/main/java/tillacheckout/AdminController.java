package tillacheckout;


import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tillacheckout.compras.Compra;
import tillacheckout.compras.CompraRepository;
import tillacheckout.venda.Venda;
import tillacheckout.venda.VendaRepository;
import tillacheckout.venda.VendaService;
import tillacheckout.venda.VendaStatus;
import tillacheckout.venda.comprovante.Comprovante;
import tillacheckout.venda.comprovante.ComprovantePac;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.ws.rs.QueryParam;
import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.List;

@SpringBootApplication
@RestController
//@EnableOAuth2Sso
public class AdminController {

    private static final String TILLA = "1672415433086307";
    private static final String RAFA = "943927495699822";

    @Autowired
    private VendaService vendaService;

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private VendaRepository vendaRepository;


    @RequestMapping("/admin/login")
    public String user() {
        return "redirect:#/vendas";
    }

    @RequestMapping("/admin/vendas")
    public List<Venda> getVendas(@RequestParam(name = "status", required = false) VendaStatus vendaStatus) {
        if(vendaStatus != null){
            return Lists.newArrayList(vendaRepository.findByVendaStatusOrderByDataDesc(vendaStatus));
        }

        List<Venda> result = vendaRepository.findAllByOrderByDataDesc();

        return Lists.newArrayList(result);
    }


    @PostMapping(value="/admin/vendas/{codigo}/comprovantes-pac/")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody Venda uploadPicture2(@RequestParam("file") MultipartFile file,
                                              @PathVariable("codigo") Long codigo){


        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();

                ComprovantePac comprovantePac = new ComprovantePac();
                comprovantePac.setFile(DatatypeConverter.parseBase64Binary(DatatypeConverter.printBase64Binary(bytes)));

                Venda v =  vendaRepository.findOne(codigo);

                if(v != null) {
                    v.setComprovantePac(comprovantePac);
                    return vendaRepository.save(v);
                }

            } catch (Exception e) {
                throw new RuntimeException("You failed to upload  => " + e.getMessage());
            }
        } else {
            throw new RuntimeException("You failed to upload  because the file was empty.");
        }
        return null;
    }

    @RequestMapping(value="/admin/vendas/{codigo}/comprovantes/image2", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity getIsoFile(@PathVariable("codigo") Long id) throws FileNotFoundException {

        Venda v =vendaRepository.findOne(id);
        if(v != null) {

            Comprovante p = v.getComprovante();
            try {
                ByteArrayInputStream fs = new ByteArrayInputStream(DatatypeConverter.parseBase64Binary(DatatypeConverter.printBase64Binary(p.getFile())));
                InputStreamResource inputStreamResource = new InputStreamResource(fs);
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.setContentLength((int) p.getFile().length);
                return new ResponseEntity(inputStreamResource, httpHeaders, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
            }
            // }
        }
        return null;
    }

    @RequestMapping(method = RequestMethod.GET, value="/admin/vendas/{codigo}/comprovantes-pac/image")
    @ResponseBody
    public ResponseEntity<InputStreamResource> getComprovantePac(@PathVariable("codigo") Long id){
        Venda v =vendaRepository.findOne(id);
        if(v != null) {

            ComprovantePac p = v.getComprovantePac();

            try {
                ByteArrayInputStream fs = new ByteArrayInputStream(DatatypeConverter.parseBase64Binary(DatatypeConverter.printBase64Binary(p.getFile())));

                BufferedImage originalImage = ImageIO.read(fs);
                ByteArrayOutputStream os = new ByteArrayOutputStream();
                ImageWriter writer = (ImageWriter) ImageIO.getImageWritersByFormatName("jpeg").next();

                ImageWriteParam param = writer.getDefaultWriteParam();
                //param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                //param.setCompressionQuality(0.2f); // Change this, float between 0.0 and 1.0

                writer.setOutput(ImageIO.createImageOutputStream(os));
                writer.write(null, new IIOImage(originalImage, null, null), param);
                writer.dispose();

                return ResponseEntity.ok()
                        //.contentLength(fs.getLength())
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new InputStreamResource(new ByteArrayInputStream(os.toByteArray())));

            } catch (Exception e) {
                e.printStackTrace();
            }
            // }
        }
        return null;
    }

    @RequestMapping(method = RequestMethod.GET, value="/admin/vendas/{codigo}/comprovantes/image")
    @ResponseBody
    public ResponseEntity<InputStreamResource> getImage(@PathVariable("codigo") Long id){
/*
        if(SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal().equals(RAFA) ||
                SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal().equals(TILLA)) {
*/
        Venda v =vendaRepository.findOne(id);
        if(v != null) {

            Comprovante p = v.getComprovante();
            try {
                ByteArrayInputStream fs = new ByteArrayInputStream(DatatypeConverter.parseBase64Binary(DatatypeConverter.printBase64Binary(p.getFile())));

                BufferedImage originalImage = ImageIO.read(fs);
                ByteArrayOutputStream os = new ByteArrayOutputStream();
                ImageWriter writer = (ImageWriter) ImageIO.getImageWritersByFormatName("jpeg").next();

                ImageWriteParam param = writer.getDefaultWriteParam();
                //param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                //param.setCompressionQuality(0.2f); // Change this, float between 0.0 and 1.0

                writer.setOutput(ImageIO.createImageOutputStream(os));
                writer.write(null, new IIOImage(originalImage, null, null), param);
                writer.dispose();

                return ResponseEntity.ok()
                        //.contentLength(fs.getLength())
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new InputStreamResource(new ByteArrayInputStream(os.toByteArray())));


            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @RequestMapping(method = RequestMethod.GET, value="/admin/vendas/{codigo}/forwardStatus")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Venda forwardStatus(@PathVariable("codigo") Long codigo){
        return vendaService.changeStatus(codigo, true);
    }

    @RequestMapping(method = RequestMethod.GET, value="/admin/vendas/{codigo}/backwardStatus")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Venda backwardStatus(@PathVariable("codigo") Long codigo){
        return vendaService.changeStatus(codigo, false);
    }



    @CrossOrigin
    @PostMapping("/admin/compras")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody Compra registrarVenda(@RequestBody Compra compra){
        return compraRepository.save(compra);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, value="/admin/compras")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody List<Compra> listarCompras(@QueryParam("recebida") boolean recebida){
        return compraRepository.findByRecebida(recebida);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, value="/admin/compras/{id}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Compra buscarCompra(@PathVariable("id") Long id){
        return compraRepository.findOne(id);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, value="/admin/compras/{id}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody Compra alterarStatusCompra(@PathVariable("id") Long id, @RequestBody Compra compra ){
        Compra c = compraRepository.findOne(id);
        c.setRecebida(compra.isRecebida());
        return compraRepository.save(compra);
    }

}