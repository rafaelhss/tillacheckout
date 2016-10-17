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
import java.util.List;

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
    public @ResponseBody Venda registrarVenda(@RequestParam("file") MultipartFile file,
                                              @RequestParam("whatsapp") String whatsapp,
                                              @RequestParam("facebook") String facebook,
                                              @RequestParam("produtos") String produtos,
                                              @RequestParam("endereco") String enderecoStr,
                                              @RequestParam("nome") String nome,
                                              @RequestParam("email") String email){

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(Endereco.class, new EnderecoDeserializer())
                .create();
        Endereco endereco = gson.fromJson(enderecoStr, Endereco.class);


        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();

                return vendaService.saveVenda(bytes, whatsapp, facebook, produtos, endereco, email, nome);

            } catch (Exception e) {
                throw new RuntimeException("You failed to upload  => " + e.getMessage());
            }
        } else {
            throw new RuntimeException("You failed to upload  because the file was empty.");
        }
    }

    @RequestMapping(method = RequestMethod.GET, value="/api/{contato}/vendas")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    List<Venda> listarVendasUsuario(@PathVariable("contato") String contato){
        System.out.println("contato:" + contato);
        return vendaRepository.findByContato(contato);
    }
}