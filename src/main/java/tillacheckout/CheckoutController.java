package tillacheckout;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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

@SpringBootApplication
@RestController
//@EnableOAuth2Sso
public class CheckoutController {

    @Autowired
    private VendaService vendaService;

    @Autowired
    private VendaRepository vendaRepository;

    @RequestMapping("/ping")
    public String ping() {
        return "pong";
    }


    @RequestMapping("/pong")
    public String pong() {
        return "ping";
    }


    @PostMapping("/api/{user}/vendas")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody Venda uploadPicture2(@RequestParam("file") MultipartFile file, @RequestParam("whatsapp") String whatsapp,
                                              @RequestParam("facebook") String facebook,
                                              @RequestParam("produtos") String produtos,
                                              @RequestParam("endereco") String enderecoStr,
                                              @PathParam("user") String user){

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(Endereco.class, new EnderecoDeserializer())
                .create();
        Endereco endereco = gson.fromJson(enderecoStr, Endereco.class);


        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();

                return vendaService.saveVenda(bytes, whatsapp, facebook, produtos, endereco, user);

            } catch (Exception e) {
                throw new RuntimeException("You failed to upload  => " + e.getMessage());
            }
        } else {
            throw new RuntimeException("You failed to upload  because the file was empty.");
        }
    }

/*
    @RequestMapping(method = RequestMethod.GET, value="/api/{user}/comprovantes/{id}/image")
    @ResponseBody
    public ResponseEntity<InputStreamResource> getImage(@PathVariable("id") Long id){

        Comprovante p = comprovanteRepository.findOne(id);
        if (p != null) {
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

*/

}