"use client";
import { useEffect, useState } from "react";
import CustomInput from "@/components/elements/inputs/CustomInput/CustomInput";
import styles from "./HomeLayout.module.scss";
import InformationTag from "@/components/elements/tags/InformationTag/InformationTag";
import { getProfile, getRepos } from "@/api/profile";
import RepoCard from "@/components/elements/cards/RepoCard/RepoCard";
import { UserI } from "@/models/user.model";
import { RepoI } from "@/models/repo.model";
import HomeSkeleton from "./HomeSkeleton";
import Image from "next/image";

const HomeLayout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [profile, setProfile] = useState<UserI | {}>({});
  const [repos, setRepos] = useState<RepoI[] | []>([]);
  const [selectedRepos, setSelectedRepos] = useState<RepoI[] | []>([]);
  const [showAll, setShowAll] = useState(false);
  const onChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    if (!!searchValue) {
      handleFetch(searchValue);
    }
  }

  async function fetchProfile(name: string) {
    try {
      const data = await getProfile(name);
      setProfile(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: HomeLayout.tsx:21 ~ fetchProfile ~ error:",
        error
      );
    }
  }
  async function fetchRepos(name: string) {
    try {
      const data = await getRepos(name);
      setRepos(data);
      setSelectedRepos(data.slice(0, 4));
    } catch (error) {
      console.log("🚀 ~ file: HomeLayout.tsx:30 ~ fetchRepos ~ error:", error);
    }
  }

  async function handleFetch(name: string) {
    setLoading(true);
    await Promise.all([fetchProfile(name), fetchRepos(name)]);
    setLoading(false);
  }

  function handleSeeAll() {
    if (!showAll) {
      setSelectedRepos([...repos]);
    } else {
      setSelectedRepos([...repos.slice(0, 4)]);
    }
    setShowAll(!showAll);
  }

  function handleOpenNav(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    handleFetch("github");
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  const { avatar_url, followers, following, location, name, bio } =
    profile as UserI;

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.header}>
  //       <CustomInput value={searchValue} onChange={onChangeSearchValue} onBlur={handleSearch}/>
  //     </div>
  //     <div className={styles["profile-header"]}>
  //       <div className={styles["image-container"]}>
  //         <img
  //           src={avatar_url}
  //           className={styles["profile-img"]}
  //           alt="Profile Image"
  //         />
  //       </div>
  //       <div className={styles["tags-container"]}>
  //         <div className={styles.tags}>
  //           <InformationTag label="Followers" value={followers} />
  //           <InformationTag label="Following" value={following} />
  //           <InformationTag label="Location" value={location} />
  //         </div>
  //       </div>
  //     </div>
  //     <section className={styles["bio-container"]}>
  //       <h1>{name}</h1>
  //       <p>{bio}</p>
  //     </section>
  //     <div className={styles["repo-container"]}>
  //       {selectedRepos.map((elto, index) => (
  //         <RepoCard repo={elto} key={index} onClick={() => handleOpenNav(elto.html_url)} />
  //       ))}
  //     </div>
  //     <section>
  //       <p onClick={handleSeeAll} className={styles['footer-text']}>{`${ showAll ? 'View less Repositories' : 'View all repositories'}`}</p>
  //     </section>
  //   </div>
  // );
  return (
    <div className={styles.container}>
      <section className={styles["profile-container"]}>
        <div className={styles["image-header"]}>
          <Image alt="Image logo" src={avatar_url} width={110} height={120} />
        </div>
      </section>

      <section className={styles["repo-list"]}>
        {selectedRepos.map((elto, index) => (
          <RepoCard
            repo={elto}
            key={index}
            onClick={() => handleOpenNav(elto.html_url)}
          />
        ))}
      </section>
    </div>
  );
};

export default HomeLayout;
