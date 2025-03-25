module Jekyll
  class MultilingualPageGenerator < Generator
    safe true

    def generate(site)
      # Get all service documents
      services = site.collections['services'].docs
      
      # For each service, create language-specific pages
      services.each do |service|
        puts "Processing service: #{service.basename_without_ext}"
        
        # Create pages for each language
        ['en', 'el'].each do |lang|
          # Get the service slug from the filename
          service_slug = service.basename_without_ext
          puts "Creating #{lang} page for #{service_slug}"
          
          # Create a new page for this language with 'services' in the path
          path = File.join(lang, 'services', service_slug)
          puts "Path will be: #{path}"
          page = PageWithoutAFile.new(site, site.source, path, "index.html")
          
          # Copy the service's data to the page
          page.data.merge!(service.data)
          
          # Don't flatten the content structure
          page.data['content'] = service.data['content']
          
          # Set language-specific data
          page.data['lang'] = lang
          permalink = "/#{lang}/services/#{service_slug}/"
          puts "Setting permalink to: #{permalink}"
          page.data['permalink'] = permalink
          page.data['layout'] = 'service'
          
          # Add the page to the site
          site.pages << page
          puts "Added page to site"
        end 
      end
    end
  end
end 