'use client'

import '../styles/marketplace.css'

export default function Marketplace() {
  const jobs = [
    {
      id: 1,
      title: 'AI Model Training: Object Detection V2',
      description: 'Seeking for a provider to train a YOLOV8 model...',
      tags: 'Tags: AI / ML, Pytorch, GPU',
      price: '$100.00',
      posted: 'Posted 2 Hours ago'
    },
    {
      id: 2,
      title: '3D Render: Sci-Fi Cityscape',
      description: 'High Poly architecture futuristic rendering',
      tags: 'Tags: 3D Rendering, Blender, VRAM >= 12GB',
      price: '$275.00',
      posted: 'Posted 5 Hours ago'
    },
    {
      id: 3,
      title: 'Architectural Visualization',
      description: 'Render high-resolution images and a short animation...',
      tags: 'Tags: 3D Rendering | Blender | VRAM 12GB+',
      price: '$100.00',
      posted: 'Posted 2 Hours ago'
    },
    {
      id: 4,
      title: 'Video Processing: Drone Footage Stabilization',
      description: 'Stabilize approximately 2 hours of 4K drone footage shot',
      tags: 'Tags: Video Processing | FFmpeg | GPU',
      price: '$27.00',
      posted: 'Posted 2 Hours ago'
    },
    {
      id: 5,
      title: 'Natural Language Processing - Sentiment Analysis',
      description: 'Seeking for a provider to train a YOLOV8 model...',
      tags: 'Tags: AI / ML, Pytorch, GPU',
      price: '$450.00',
      posted: 'Posted 2 Hours ago'
    },
    {
      id: 6,
      title: 'AI Model Training: Object Detection V2',
      description: 'Seeking for a provider to train a YOLOV8 model...',
      tags: 'Tags: AI / ML, Pytorch, GPU',
      price: '$500.00',
      posted: 'Posted 2 Hours ago'
    }
  ]

  return (
    <div className="marketplace-container">
      <style dangerouslySetInnerHTML={{__html: 'html body { background: rgb(255, 255, 255); }'}} />
      
      <div id="main">
        <div className="framer-DswEt framer-72rtr7" style={{ minHeight: '100vh', width: 'auto' }}>
          
          {/* Header Section */}
          <div className="framer-125z3mo" data-framer-name="Project Overview">
            <div className="framer-m8of2" data-framer-name="Component 1">
              
              {/* Logo */}
              <div className="framer-37xoak" data-framer-name="The Loom" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                <p className="framer-text" style={{
                  fontFamily: '"Poppins", "Poppins Placeholder", sans-serif',
                  fontSize: '30px',
                  fontWeight: 700,
                  textAlign: 'center',
                  color: 'rgb(255, 255, 255)'
                }}>
                  The Loom
                </p>
              </div>

              {/* Navigation Menu */}
              <div className="framer-1r2ec80" data-framer-name="Frame 2">
                <div className="framer-1m9n3ft" data-framer-name="Download" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    textAlign: 'center',
                    color: 'rgb(255, 255, 255)'
                  }}>
                    Download
                  </p>
                </div>

                <div className="framer-8ibtpi" data-framer-name="Post a job" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    textAlign: 'center',
                    color: 'rgb(255, 255, 255)'
                  }}>
                    Post a job
                  </p>
                </div>

                <div className="framer-1yfxi" data-framer-name="Explore Jobs" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    textAlign: 'center',
                    color: 'rgb(255, 255, 255)'
                  }}>
                    Explore Jobs
                  </p>
                </div>

                {/* Connect Wallet Button */}
                <div className="framer-1bjicjk" data-border="true" data-framer-name="Frame 1">
                  <div className="framer-7xm8sy" data-framer-name="Connect Wallet" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                    <p className="framer-text" style={{
                      fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                      fontWeight: 300,
                      textAlign: 'center'
                    }}>
                      Connect Wallet
                    </p>
                  </div>
                </div>
              </div>

              <div className="framer-2wl2u3" data-framer-name="Rectangle 1"></div>
            </div>

            {/* Search Bar */}
            <div className="framer-1f4rsde" data-framer-name="Group 21">
              <div className="framer-1cnhyi9" data-border="true" data-framer-name="Frame 1">
                <div className="framer-1t1xuab" data-framer-name="Search keywords" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    Search keywords
                  </p>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="framer-1a3hkde" data-border="true" data-framer-name="Frame 13">
              <div className="framer-aghk5x" data-framer-name="Project Categories" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                <p className="framer-text" style={{
                  fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                  textAlign: 'center',
                  color: 'rgb(255, 255, 255)'
                }}>
                  Project Categories
                </p>
              </div>

              <div className="framer-sgfw90" data-framer-name="Filters" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'translateX(-50%)' }}>
                <p className="framer-text" style={{
                  fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                  textAlign: 'center',
                  color: 'rgb(255, 255, 255)'
                }}>
                  Filters
                </p>
              </div>

              {/* Categories */}
              <div className="framer-bgrla2" data-framer-name="Group 6">
                <div className="framer-cmeyx9" data-framer-name="All" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    All
                  </p>
                </div>

                <div className="framer-1281ud8" data-framer-name="AI / Machine Learning" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    AI / Machine Learning
                  </p>
                </div>

                <div className="framer-7m8qxl" data-framer-name="3D Rendering" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    3D Rendering
                  </p>
                </div>

                <div className="framer-1cmw2d6" data-framer-name="Physics Simulation" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    Physics Simulation
                  </p>
                </div>

                <div className="framer-1ozwu6q" data-framer-name="Video Processing" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    Video Processing
                  </p>
                </div>
              </div>

              {/* VRAM Filter */}
              <div className="framer-1htwiiy" data-framer-name="Reward" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                <p className="framer-text" style={{
                  fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                  fontWeight: 300,
                  color: 'rgb(255, 255, 255)'
                }}>
                  Reward
                </p>
              </div>

              <div className="framer-1qqkw4" data-framer-name="Group 18">
                <div className="framer-ivdk3w" data-framer-name="VRAM:" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    VRAM:
                  </p>
                </div>
                <div className="framer-1crdyll" data-framer-name="12GB" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontSize: '12px',
                    fontWeight: 300,
                    color: 'rgb(136, 136, 136)'
                  }}>
                    12GB
                  </p>
                </div>
              </div>

              {/* Min/Max ETH */}
              <div className="framer-xx793w" data-framer-name="Group 8">
                <div className="framer-13hvs3z" data-border="true" data-framer-name="Rectangle 10"></div>
                <div className="framer-1c78ojr" data-framer-name="Min ETH" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontSize: '10px',
                    fontWeight: 300,
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.75)'
                  }}>
                    Min ETH
                  </p>
                </div>
              </div>

              <div className="framer-16ilaj" data-framer-name="Group 9">
                <div className="framer-1ikcnas" data-border="true" data-framer-name="Rectangle 11"></div>
                <div className="framer-zqqh7u" data-framer-name="Max ETH" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontSize: '10px',
                    fontWeight: 300,
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.75)'
                  }}>
                    Max ETH
                  </p>
                </div>
              </div>

              {/* CPU/GPU Checkboxes */}
              <div className="framer-12i30s7" data-framer-name="Group 19">
                <div className="framer-uhkgi1" data-framer-name="CPU" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    CPU
                  </p>
                </div>
              </div>

              <div className="framer-3ifyp4" data-framer-name="Group 20">
                <div className="framer-u75fnc" data-framer-name="GPU" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                  <p className="framer-text" style={{
                    fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                    fontWeight: 300,
                    color: 'rgb(255, 255, 255)'
                  }}>
                    GPU
                  </p>
                </div>
              </div>
            </div>

            {/* Available Jobs Title */}
            <div className="framer-sz3c7q" data-framer-name="Available Jobs" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'translateX(-50%)' }}>
              <p className="framer-text" style={{
                fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'rgb(255, 255, 255)'
              }}>
                Available Jobs
              </p>
            </div>

            {/* Job Listings */}
            {jobs.map((job, index) => (
              <div key={job.id} className={`framer-${index === 0 ? '1fmj4rk' : index === 1 ? 'luzwuj' : index === 2 ? 'tg5kek' : index === 3 ? '1bsj2sm' : index === 4 ? '1dfk703' : 'sywcin'}`} data-framer-name={`Group ${12 + index}`}>
                <div className="framer-1b09xdw" data-framer-name="Group 10">
                  <div className="framer-sv7c8l" data-framer-name="Tags" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                    <p className="framer-text" style={{
                      fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                      fontWeight: 300,
                      color: 'rgb(255, 255, 255)'
                    }}>
                      {job.tags}
                    </p>
                  </div>

                  <div className="framer-hld31y" data-framer-name="Description" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                    <p className="framer-text" style={{
                      fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                      fontWeight: 300,
                      color: 'rgb(255, 255, 255)'
                    }}>
                      {job.description}
                    </p>
                  </div>

                  <div className="framer-j1phhn" data-framer-name="Title" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'translateX(-50%)' }}>
                    <p className="framer-text" style={{
                      fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                      fontSize: '24px',
                      letterSpacing: '0.05em',
                      color: 'rgb(255, 255, 255)'
                    }}>
                      {job.title}
                    </p>
                  </div>
                </div>

                <div className="framer-dnk489" data-framer-name="Group 11">
                  <div className="framer-1k6rl8v" data-framer-name="Posted" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'none' }}>
                    <p className="framer-text" style={{ color: 'rgb(136, 136, 136)' }}>
                      {job.posted}
                    </p>
                  </div>

                  <div className="framer-rg030a" data-framer-name="Price" data-framer-component-type="RichTextContainer" style={{ justifyContent: 'center', transform: 'translateX(-50%)' }}>
                    <p className="framer-text" style={{
                      fontFamily: '"Montserrat", "Montserrat Placeholder", sans-serif',
                      fontSize: '24px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: 'rgb(255, 255, 255)'
                    }}>
                      {job.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
