package tillacheckout;


import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tillacheckout.venda.Venda;
import tillacheckout.venda.VendaRepository;
import tillacheckout.venda.VendaService;
import tillacheckout.venda.comprovante.Comprovante;
import tillacheckout.venda.comprovante.ComprovantePac;
import tillacheckout.venda.comprovante.ComprovantePacRepository;
import tillacheckout.venda.comprovante.ComprovanteRepository;
import tillacheckout.venda.endereco.Endereco;
import tillacheckout.venda.endereco.EnderecoDeserializer;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.websocket.server.PathParam;
import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
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
    private ComprovanteRepository comprovanteRepository;

    @Autowired
    private ComprovantePacRepository comprovantePacRepository;

    @Autowired
    private VendaRepository vendaRepository;


    @RequestMapping("/admin/login")
    public String user() {
        return "redirect:#/vendas";
    }

    @RequestMapping("/admin/vendas")
    public List<Venda> getVendas() {
/*
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        System.out.println("authentication.getPrincipal(): " + authentication.getPrincipal());

        if(authentication.getPrincipal().equals(RAFA) || authentication.getPrincipal().equals(TILLA)) {
        */
            return Lists.newArrayList(vendaRepository.findAll());
       /* }
        else
        {
            return null;
        }*/
    }
    @PostMapping(value="/admin/vendas/{codigo}/comprovantes-pac/")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody ComprovantePac uploadPicture2(@RequestParam("file") MultipartFile file,
                                              @PathParam("codigo") Long codigo){


        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();

                ComprovantePac comprovantePac = new ComprovantePac();
                comprovantePac.setFile(DatatypeConverter.parseBase64Binary(DatatypeConverter.printBase64Binary(bytes)));

                Venda v =  vendaRepository.findOne(codigo);

                if(v != null) {
                    comprovantePac.setVenda(v);
                    return comprovantePacRepository.save(comprovantePac);
                }

            } catch (Exception e) {
                throw new RuntimeException("You failed to upload  => " + e.getMessage());
            }
        } else {
            throw new RuntimeException("You failed to upload  because the file was empty.");
        }
        return null;
    }

    @RequestMapping(method = RequestMethod.GET, value="/admin/comprovantes/{id}/image")
    @ResponseBody
    public ResponseEntity<InputStreamResource> getImage(@PathVariable("id") Long id){
/*
        if(SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal().equals(RAFA) ||
                SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal().equals(TILLA)) {
*/
            Comprovante p = comprovanteRepository.findOne(id);
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
        return null;
    }
}