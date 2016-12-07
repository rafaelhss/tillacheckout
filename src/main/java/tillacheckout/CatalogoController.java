package tillacheckout;

import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tillacheckout.catalogo.Produto;
import tillacheckout.catalogo.ProdutoRepository;
import tillacheckout.venda.Venda;
import tillacheckout.venda.endereco.Endereco;
import tillacheckout.venda.endereco.EnderecoDeserializer;

import java.util.List;

@SpringBootApplication
@RestController
public class CatalogoController {

    @Autowired
    private ProdutoRepository produtoRepository;


    @CrossOrigin(origins = "http://localhost:63343")
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(
            value = "/api/produto",
            method = RequestMethod.POST)
    public @ResponseBody Produto registrarProduto(@RequestBody Produto produto){
        return produtoRepository.save(produto);
    }


    @RequestMapping(
            value = "/api/produto/{id}",
            method = RequestMethod.PUT)
    public @ResponseBody Produto alterarProduto(@PathVariable("id") long id, @RequestBody Produto produto){
        Produto p = produtoRepository.findOne(id);

        if (produto.getDescAdicional() != null) {
            p.setDescAdicional(produto.getDescAdicional());
        }
        if(produto.getDescCompleta() != null) {
            p.setDescCompleta(produto.getDescCompleta());
        }
        if(produto.getDescCurta() != null) {
            p.setDescCurta(produto.getDescCurta());
        }
        if(produto.getImagens() != null && produto.getImagens().size() > 0) {
           /* if(p.getImagens() != null && p.getImagens().size() > 0){
                p.getImagens().addAll(produto.getImagens());
            }
            else {*/
                p.setImagens(produto.getImagens());
           // }
        }
        if(produto.getMarca() != null) {
            p.setMarca(produto.getMarca());
        }
        if(produto.getNome() != null) {
            p.setNome(produto.getNome());
        }
        if(produto.getPreco() != null) {
            p.setPreco(produto.getPreco());
        }
        if(produto.getQuantidadebh() != null) {
            p.setQuantidadebh(produto.getQuantidadebh());
        }
        if(produto.getQuantidadebsb() != null) {
            p.setQuantidadebsb(produto.getQuantidadebsb());
        }
        return produtoRepository.save(p);
    }

    @RequestMapping(
            value = "/api/produto/{id}",
            method = RequestMethod.DELETE)
    public void deletarProduto(@PathVariable("id") long id){
        Produto p = produtoRepository.findOne(id);
        if(p != null) {
            produtoRepository.delete(p);
        }
    }

    @RequestMapping(
            value = "/api/produto",
            method = RequestMethod.GET)
    public @ResponseBody List<Produto> listarProdutos(){
        return Lists.newArrayList(produtoRepository.findAll());
    }

    @RequestMapping("/api/produto/{id}")
    public @ResponseBody Produto buscarProduto(@PathVariable("id") long id){
        return produtoRepository.findOne(id);
    }
}